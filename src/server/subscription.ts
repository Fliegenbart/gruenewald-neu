import { prisma } from "@/server/db";
import { SubscriptionTier } from "@prisma/client";

/**
 * Source of truth: `user.tier` is derived from Stripe webhook updates.
 * Do NOT set tier from client requests.
 */
export async function getUserTier(userId: string): Promise<SubscriptionTier> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { tier: true }
  });
  return user?.tier ?? SubscriptionTier.free;
}

export function isPaidTier(tier: SubscriptionTier) {
  return tier === SubscriptionTier.pro || tier === SubscriptionTier.team;
}
