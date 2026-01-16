import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export const dynamic = 'force-dynamic';
import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import { AssessmentUpdateSchema } from "@/server/schemas";
import { buildAssessmentPdf } from "@/server/pdf";
import { isPaidTier, getUserTier } from "@/server/subscription";
import { getQuestions } from "@/domain/frameworks/banks";
import type { FrameworkKey } from "@/domain/frameworks";

type FullAnswer = { status: "none" | "partial" | "full"; comment?: string };
type Answers = Record<string, boolean> | Record<string, FullAnswer>;

function isFullAnswers(answers: Answers): answers is Record<string, FullAnswer> {
  const firstValue = Object.values(answers)[0];
  return firstValue !== undefined && typeof firstValue === "object" && "status" in firstValue;
}

type Params = { params: { id: string } };

export async function GET(req: Request, { params }: Params) {
  const url = new URL(req.url);
  const wantPdf = url.searchParams.get("pdf") === "1";

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const assessment = await prisma.assessment.findUnique({
    where: { id: params.id },
    include: { framework: true }
  });
  if (!assessment || assessment.userId !== user.id) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (wantPdf) {
    const tier = await getUserTier(user.id);
    if (!isPaidTier(tier)) return NextResponse.json({ error: "PDF export requires Pro" }, { status: 402 });

    // Parse answers
    const answers = JSON.parse(assessment.answers) as Answers;
    const isFullAudit = isFullAnswers(answers);

    // Get questions for this framework
    const frameworkQuestions = getQuestions(
      assessment.framework.key as FrameworkKey,
      assessment.type as "QUICK" | "FULL"
    );
    const questionMap = new Map(frameworkQuestions.map(q => [q.id, q]));

    // Calculate stats
    let compliantCount = 0;
    let partialCount = 0;
    let gapsCount = 0;

    // Build question details for PDF
    const questionDetails = Object.entries(answers).map(([questionId, answer]) => {
      const question = questionMap.get(questionId);

      if (isFullAudit) {
        const fullAnswer = answer as FullAnswer;
        if (fullAnswer.status === "full") compliantCount++;
        else if (fullAnswer.status === "partial") partialCount++;
        else gapsCount++;

        return {
          id: questionId,
          text: question?.text || questionId,
          status: fullAnswer.status as "full" | "partial" | "none",
          comment: fullAnswer.comment
        };
      } else {
        const boolAnswer = answer as boolean;
        if (boolAnswer) compliantCount++;
        else gapsCount++;

        return {
          id: questionId,
          text: question?.text || questionId,
          status: boolAnswer ? "yes" as const : "no" as const
        };
      }
    });

    const pdfBytes = await buildAssessmentPdf({
      frameworkName: assessment.framework.name,
      assessmentType: assessment.type,
      score: assessment.score,
      gapsCount,
      compliantCount,
      partialCount,
      totalQuestions: Object.keys(answers).length,
      createdAtISO: assessment.createdAt.toISOString(),
      questions: questionDetails
    });

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="assessment-${assessment.framework.key}-${assessment.id}.pdf"`
      }
    });
  }

  return NextResponse.json({
    assessment: {
      ...assessment,
      answers: JSON.parse(assessment.answers)
    }
  });
}

export async function PUT(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const assessment = await prisma.assessment.findUnique({ where: { id: params.id } });
  if (!assessment || assessment.userId !== user.id) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const json = await req.json();
  const parsed = AssessmentUpdateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });
  }

  const updated = await prisma.assessment.update({
    where: { id: params.id },
    data: {
      answers: parsed.data.answers ? JSON.stringify(parsed.data.answers) : assessment.answers
    }
  });

  return NextResponse.json({
    assessment: {
      ...updated,
      answers: JSON.parse(updated.answers)
    }
  });
}

export async function DELETE(_: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const assessment = await prisma.assessment.findUnique({ where: { id: params.id } });
  if (!assessment || assessment.userId !== user.id) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.assessment.delete({ where: { id: params.id } });

  return NextResponse.json({ ok: true });
}
