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

// Lazy initialization - only validate at runtime, not build time
let _env: z.infer<typeof EnvSchema> | null = null;

export const env = new Proxy({} as z.infer<typeof EnvSchema>, {
  get(_, prop: string) {
    if (_env === null) {
      _env = EnvSchema.parse(process.env);
    }
    return _env[prop as keyof z.infer<typeof EnvSchema>];
  }
});
