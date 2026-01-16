import { NextResponse } from "next/server";
import { z } from "zod";
import { computeScore } from "@/domain/scoring/score";
import { getQuestions } from "@/domain/frameworks/banks";
import type { FrameworkKey } from "@/domain/frameworks";

const QuickAuditSchema = z.object({
  frameworkKey: z.enum(["ISO_27001", "ISO_13485", "EU_MDR", "EU_GMP_ANNEX_11"]),
  answers: z.record(z.boolean())
});

/**
 * Anonymous Quick Audit - no login required
 * Computes score and returns results without saving to database
 * Used for lead generation
 */
export async function POST(req: Request) {
  const json = await req.json();
  const parsed = QuickAuditSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });
  }

  const { frameworkKey, answers } = parsed.data;

  // Get QUICK questions for scoring
  const questions = getQuestions(frameworkKey as FrameworkKey, "QUICK");
  const { score, gapsCount } = computeScore({ questions, answers });

  // Find gaps (questions answered with "no")
  const gaps = questions
    .filter(q => answers[q.id] === false)
    .map(q => ({
      id: q.id,
      text: q.text,
      help: q.help
    }));

  // Find compliant items (questions answered with "yes")
  const compliant = questions
    .filter(q => answers[q.id] === true)
    .map(q => ({
      id: q.id,
      text: q.text
    }));

  return NextResponse.json({
    frameworkKey,
    score,
    gapsCount,
    totalQuestions: questions.length,
    gaps,
    compliant,
    // CTA data
    consultingUrl: "https://www.gruenewald-gmbh.de",
    message: gapsCount > 0
      ? `Wir haben ${gapsCount} Compliance-Lücken identifiziert. Unsere Experten helfen Ihnen, diese zu schließen.`
      : "Gratulation! Sie erfüllen die Kernanforderungen. Für eine umfassende Prüfung kontaktieren Sie uns."
  });
}
