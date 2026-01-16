import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/server/stripe";
import { env } from "@/server/env";
import { prisma } from "@/server/db";

// SQLite doesn't support enums, so we use string types
type SubscriptionStatus = "active" | "trialing" | "past_due" | "canceled" | "incomplete" | "incomplete_expired" | "unpaid";
type SubscriptionTier = "free" | "pro" | "team";

function mapStripeStatus(status: string): SubscriptionStatus {
  switch (status) {
    case "active":
      return "active";
    case "trialing":
      return "trialing";
    case "past_due":
      return "past_due";
    case "canceled":
      return "canceled";
    case "incomplete":
      return "incomplete";
    case "incomplete_expired":
      return "incomplete_expired";
    case "unpaid":
      return "unpaid";
    default:
      return "canceled";
  }
}

function tierFromPrice(priceId?: string | null): SubscriptionTier {
  if (!priceId) return "free";
  if (priceId === env.STRIPE_PRICE_TEAM_MONTHLY) return "team";
  if (priceId === env.STRIPE_PRICE_PRO_MONTHLY) return "pro";
  return "pro"; // fallback: treat unknown paid as pro
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle subscription changes
  if (event.type.startsWith("customer.subscription.")) {
    const sub = event.data.object as any;
    const customerId = sub.customer as string;
    const stripeSubId = sub.id as string;
    const status = mapStripeStatus(sub.status);

    const priceId = sub.items?.data?.[0]?.price?.id ?? null;
    const tier = status === "active" || status === "trialing"
      ? tierFromPrice(priceId)
      : "free";

    const currentPeriodEnd = sub.current_period_end ? new Date(sub.current_period_end * 1000) : null;
    const cancelAtPeriodEnd = Boolean(sub.cancel_at_period_end);

    const user = await prisma.user.findFirst({ where: { stripeCustomerId: customerId } });
    if (user) {
      await prisma.subscription.upsert({
        where: { userId: user.id },
        update: {
          stripeSubscriptionId: stripeSubId,
          stripePriceId: priceId,
          status,
          currentPeriodEnd: currentPeriodEnd ?? undefined,
          cancelAtPeriodEnd
        },
        create: {
          userId: user.id,
          stripeSubscriptionId: stripeSubId,
          stripePriceId: priceId,
          status,
          currentPeriodEnd: currentPeriodEnd ?? undefined,
          cancelAtPeriodEnd
        }
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { tier }
      });
    }
  }

  return NextResponse.json({ received: true });
}
