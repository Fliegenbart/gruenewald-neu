import type { Question } from "@/domain/frameworks/banks";
import type { FullAnswerValue } from "@/server/schemas";

type QuickAnswers = Record<string, boolean>;
type FullAnswers = Record<string, FullAnswerValue>;

function isFullAnswers(answers: QuickAnswers | FullAnswers): answers is FullAnswers {
  const firstValue = Object.values(answers)[0];
  return firstValue !== undefined && typeof firstValue === "object" && "status" in firstValue;
}

/**
 * Scoring logic:
 * - QUICK: yes = 1, no = 0
 * - FULL: none = 0, partial = 0.5, full = 1
 * - score = round(100 * avg)
 * - gaps = count of items not fully implemented
 */
export function computeScore(params: {
  questions: Question[];
  answers: QuickAnswers | FullAnswers;
}) {
  const { questions, answers } = params;
  const total = questions.length || 1;

  let points = 0;
  let gaps = 0;

  if (isFullAnswers(answers)) {
    // FULL audit: 3-level scoring
    for (const q of questions) {
      const v = answers[q.id];
      if (!v || v.status === "none") {
        gaps += 1;
      } else if (v.status === "partial") {
        points += 0.5;
        gaps += 1; // Partial still counts as a gap
      } else if (v.status === "full") {
        points += 1;
      }
    }
  } else {
    // QUICK audit: boolean scoring
    for (const q of questions) {
      const v = answers[q.id];
      if (v) points += 1;
      else gaps += 1;
    }
  }

  const score = Math.round((points / total) * 100);
  return { score, gapsCount: gaps };
}
