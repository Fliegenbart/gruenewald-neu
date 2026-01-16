import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export const dynamic = 'force-dynamic';
import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import { stripe } from "@/server/stripe";
import { env } from "@/server/env";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const priceId = body?.priceId;
  if (!priceId) return NextResponse.json({ error: "Missing priceId" }, { status: 400 });

  // Ensure Stripe customer
  const customerId =
    user.stripeCustomerId ||
    (await (async () => {
      const c = await stripe.customers.create({
        email: user.email,
        name: user.name ?? undefined,
        metadata: { userId: user.id }
      });
      await prisma.user.update({ where: { id: user.id }, data: { stripeCustomerId: c.id } });
      return c.id;
    })());

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${env.APP_URL}/dashboard?upgraded=1`,
    cancel_url: `${env.APP_URL}/pricing?canceled=1`,
    allow_promotion_codes: true,
    metadata: { userId: user.id }
  });

  return NextResponse.json({ url: checkoutSession.url });
}
