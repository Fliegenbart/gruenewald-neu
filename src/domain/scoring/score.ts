import type { Question } from "@/domain/frameworks/questions";

/**
 * Placeholder scoring:
 * - yes = 1, no = 0
 * - score = round(100 * avg)
 * - gaps = count(no)
 *
 * Replace with weighted scoring + maturity levels.
 */
export function computeScore(params: {
  questions: Question[];
  answers: Record<string, boolean>;
}) {
  const { questions, answers } = params;
  const total = questions.length || 1;

  let yes = 0;
  let gaps = 0;

  for (const q of questions) {
    const v = answers[q.id];
    if (v) yes += 1;
    else gaps += 1;
  }

  const score = Math.round((yes / total) * 100);
  return { score, gapsCount: gaps };
}
