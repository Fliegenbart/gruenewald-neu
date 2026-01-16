import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().min(1),

  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(16),

  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  STRIPE_PRICE_PRO_MONTHLY: z.string().min(1),
  STRIPE_PRICE_TEAM_MONTHLY: z.string().min(1),

  APP_URL: z.string().url()
});

export const env = EnvSchema.parse(process.env);
