import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export const dynamic = 'force-dynamic';
import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import { stripe } from "@/server/stripe";
import { env } from "@/server/env";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user?.stripeCustomerId) return NextResponse.json({ error: "No Stripe customer" }, { status: 400 });

  const portal = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${env.APP_URL}/dashboard`
  });

  return NextResponse.json({ url: portal.url });
}
