import { prisma } from "@/server/db";
import { SubscriptionTier } from "@prisma/client";
import { isPaidTier } from "@/server/subscription";

/**
 * Free users: max 1 assessment per framework.
 * Paid users: unlimited.
 */
export async function assertCanCreateAssessment(params: {
  userId: string;
  frameworkId: string;
  tier: SubscriptionTier;
}) {
  const { userId, frameworkId, tier } = params;

  if (isPaidTier(tier)) return;

  const count = await prisma.assessment.count({
    where: { userId, frameworkId }
  });

  if (count >= 1) {
    const err = new Error("Free tier limit reached for this framework.");
    // @ts-expect-error attach status
    err.status = 402; // Payment Required (useful semantics)
    throw err;
  }
}
