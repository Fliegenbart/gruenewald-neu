import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import { AssessmentUpdateSchema } from "@/server/schemas";
import { buildAssessmentPdf } from "@/server/pdf";
import { isPaidTier, getUserTier } from "@/server/subscription";

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

    const pdfBytes = await buildAssessmentPdf({
      frameworkName: assessment.framework.name,
      score: assessment.score,
      gapsCount: assessment.gapsCount,
      createdAtISO: assessment.createdAt.toISOString()
    });

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="assessment-${assessment.id}.pdf"`
      }
    });
  }

  return NextResponse.json({ assessment });
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
      answers: parsed.data.answers ?? assessment.answers
    }
  });

  return NextResponse.json({ assessment: updated });
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
