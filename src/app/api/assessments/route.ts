import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import { AssessmentCreateSchema } from "@/server/schemas";
import { computeScore } from "@/domain/scoring/score";
import { getQuestions } from "@/domain/frameworks/banks";
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

  // Parse answers JSON string back to object for each assessment
  const parsedAssessments = assessments.map(a => ({
    ...a,
    answers: JSON.parse(a.answers)
  }));

  return NextResponse.json({ assessments: parsedAssessments });
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

  const { frameworkKey, type, answers } = parsed.data;

  const framework = await prisma.framework.findUnique({ where: { key: frameworkKey } });
  if (!framework) return NextResponse.json({ error: "Unknown framework" }, { status: 404 });

  const tier = await getUserTier(user.id);

  // Check paywall (tier requirements and limits)
  try {
    await assertCanCreateAssessment({
      userId: user.id,
      frameworkId: framework.id,
      tier,
      type: type as "QUICK" | "FULL"
    });
  } catch (e: any) {
    const status = e?.status ?? 402;
    const code = e?.code ?? "PAYWALL";
    return NextResponse.json({ error: e.message ?? "Paywall", code }, { status });
  }

  // Get questions for this framework and type
  const questions = getQuestions(frameworkKey, type as "QUICK" | "FULL");
  const { score, gapsCount } = computeScore({ questions, answers });

  const assessment = await prisma.assessment.create({
    data: {
      userId: user.id,
      frameworkId: framework.id,
      type: type,
      answers: JSON.stringify(answers), // Store as JSON string for SQLite
      score,
      gapsCount
    }
  });

  return NextResponse.json({
    assessment: {
      ...assessment,
      answers // Return the original object, not the string
    }
  }, { status: 201 });
}
