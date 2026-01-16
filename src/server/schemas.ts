import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).optional(),
  company: z.string().min(1).optional()
});

export const AssessmentCreateSchema = z.object({
  frameworkKey: z.enum(["ISO_27001", "ISO_13485", "EU_MDR", "EU_GMP_ANNEX_11"]),
  answers: z.record(z.boolean())
});

export const AssessmentUpdateSchema = z.object({
  answers: z.record(z.boolean()).optional()
});
