import { prisma } from "@/server/db";

export type SubscriptionTier = "free" | "pro" | "team";

/**
 * Source of truth: `user.tier` is derived from Stripe webhook updates.
 * Do NOT set tier from client requests.
 */
export async function getUserTier(userId: string): Promise<SubscriptionTier> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { tier: true }
  });
  return (user?.tier as SubscriptionTier) ?? "free";
}

export function isPaidTier(tier: SubscriptionTier) {
  return tier === "pro" || tier === "team";
}
