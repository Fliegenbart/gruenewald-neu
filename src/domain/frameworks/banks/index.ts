import type { FrameworkKey } from "../index";

export type Question = {
  id: string;
  text: string;
  help?: string;
  weight?: number;
};

export type AssessmentType = "QUICK" | "FULL";

// Import QUICK question banks
import { questions as ISO_27001_QUICK } from "./ISO_27001/quick";
import { questions as ISO_13485_QUICK } from "./ISO_13485/quick";
import { questions as EU_MDR_QUICK } from "./EU_MDR/quick";
import { questions as EU_GMP_ANNEX_11_QUICK } from "./EU_GMP_ANNEX_11/quick";

// Import FULL question banks
import { questions as ISO_27001_FULL } from "./ISO_27001/full";
import { questions as ISO_13485_FULL } from "./ISO_13485/full";
import { questions as EU_MDR_FULL } from "./EU_MDR/full";
import { questions as EU_GMP_ANNEX_11_FULL } from "./EU_GMP_ANNEX_11/full";

const QUESTION_BANKS: Record<FrameworkKey, Record<AssessmentType, Question[]>> = {
  ISO_27001: {
    QUICK: ISO_27001_QUICK,
    FULL: ISO_27001_FULL
  },
  ISO_13485: {
    QUICK: ISO_13485_QUICK,
    FULL: ISO_13485_FULL
  },
  EU_MDR: {
    QUICK: EU_MDR_QUICK,
    FULL: EU_MDR_FULL
  },
  EU_GMP_ANNEX_11: {
    QUICK: EU_GMP_ANNEX_11_QUICK,
    FULL: EU_GMP_ANNEX_11_FULL
  }
};

/**
 * Get questions for a specific framework and assessment type
 */
export function getQuestions(frameworkKey: FrameworkKey, type: AssessmentType): Question[] {
  const frameworkBank = QUESTION_BANKS[frameworkKey];
  if (!frameworkBank) {
    throw new Error(`Unknown framework: ${frameworkKey}`);
  }

  const questions = frameworkBank[type];
  if (!questions) {
    throw new Error(`Unknown assessment type: ${type}`);
  }

  return questions;
}

/**
 * Get question count for a specific framework and assessment type
 */
export function getQuestionCount(frameworkKey: FrameworkKey, type: AssessmentType): number {
  return getQuestions(frameworkKey, type).length;
}

// Re-export for backward compatibility
export { QUESTION_BANKS };
