import { prisma } from "@/server/db";
import { SubscriptionTier, AssessmentType } from "@prisma/client";
import { isPaidTier } from "@/server/subscription";

class PaywallError extends Error {
  status: number;
  code: string;

  constructor(message: string, status: number, code: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

/**
 * Check if user can create an assessment based on type and tier.
 *
 * FULL assessments: require pro/team tier (402 if free)
 * QUICK assessments:
 *   - Paid users: unlimited
 *   - Free users: max 1 per framework per 30 days (402 if limit reached)
 */
export async function assertCanCreateAssessment(params: {
  userId: string;
  frameworkId: string;
  tier: SubscriptionTier;
  type: AssessmentType;
}) {
  const { userId, frameworkId, tier, type } = params;

  // FULL assessments require paid tier
  if (type === "FULL") {
    if (!isPaidTier(tier)) {
      throw new PaywallError(
        "Full Audit erfordert ein Pro- oder Team-Abo.",
        402,
        "UPGRADE_REQUIRED"
      );
    }
    return; // Paid users can do unlimited FULL assessments
  }

  // QUICK assessments
  if (isPaidTier(tier)) {
    return; // Paid users can do unlimited QUICK assessments
  }

  // Free users: max 1 QUICK per framework per 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentCount = await prisma.assessment.count({
    where: {
      userId,
      frameworkId,
      type: "QUICK",
      createdAt: { gte: thirtyDaysAgo }
    }
  });

  if (recentCount >= 1) {
    throw new PaywallError(
      "Sie haben bereits einen Quick Audit für dieses Framework in den letzten 30 Tagen durchgeführt. Upgraden Sie auf Pro für unbegrenzte Assessments.",
      402,
      "QUICK_LIMIT_REACHED"
    );
  }
}

/**
 * Check if user has access to a specific assessment type
 */
export function canAccessAssessmentType(tier: SubscriptionTier, type: AssessmentType): boolean {
  if (type === "FULL") {
    return isPaidTier(tier);
  }
  return true; // QUICK is available to all tiers
}
