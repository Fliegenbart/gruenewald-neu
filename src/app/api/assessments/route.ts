import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import { AssessmentCreateSchema } from "@/server/schemas";
import { computeScore } from "@/domain/scoring/score";
import { QUESTIONS } from "@/domain/frameworks/questions";
import { assertCanCreateAssessment } from "@/server/paywall";
import { getUserTier } from "@/server/subscription";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true, tier: true } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Free users: no history (can change if you want)
  if (user.tier === "free") {
    return NextResponse.json({ assessments: [] });
  }

  const assessments = await prisma.assessment.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { framework: true }
  });

  return NextResponse.json({ assessments });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const json = await req.json();
  const parsed = AssessmentCreateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });
  }

  const { frameworkKey, answers } = parsed.data;

  const framework = await prisma.framework.findUnique({ where: { key: frameworkKey } });
  if (!framework) return NextResponse.json({ error: "Unknown framework" }, { status: 404 });

  const tier = await getUserTier(user.id);
  try {
    await assertCanCreateAssessment({ userId: user.id, frameworkId: framework.id, tier });
  } catch (e: any) {
    const status = e?.status ?? 400;
    return NextResponse.json({ error: e.message ?? "Paywall" }, { status });
  }

  const questions = QUESTIONS[frameworkKey];
  const { score, gapsCount } = computeScore({ questions, answers });

  const assessment = await prisma.assessment.create({
    data: {
      userId: user.id,
      frameworkId: framework.id,
      answers,
      score,
      gapsCount
    }
  });

  return NextResponse.json({ assessment }, { status: 201 });
}
