import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).optional(),
  company: z.string().min(1).optional()
});

export const AssessmentTypeSchema = z.enum(["QUICK", "FULL"]);
export type AssessmentType = z.infer<typeof AssessmentTypeSchema>;

// QUICK audit: simple boolean answers
export const QuickAnswerSchema = z.record(z.boolean());

// FULL audit: 3-level scale with optional comment
export const FullAnswerValueSchema = z.object({
  status: z.enum(["none", "partial", "full"]),
  comment: z.string().optional()
});
export type FullAnswerValue = z.infer<typeof FullAnswerValueSchema>;

export const FullAnswerSchema = z.record(FullAnswerValueSchema);

export const AssessmentCreateSchema = z.object({
  frameworkKey: z.enum(["ISO_27001", "ISO_13485", "EU_MDR", "EU_GMP_ANNEX_11"]),
  type: AssessmentTypeSchema.default("QUICK"),
  answers: z.union([QuickAnswerSchema, FullAnswerSchema])
});

export const AssessmentUpdateSchema = z.object({
  answers: z.union([QuickAnswerSchema, FullAnswerSchema]).optional()
});
