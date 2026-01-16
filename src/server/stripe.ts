import Stripe from "stripe";
import { env } from "@/server/env";

// Lazy initialization to avoid build-time env validation
let _stripe: Stripe | null = null;

export const stripe = new Proxy({} as Stripe, {
  get(_, prop: string) {
    if (_stripe === null) {
      _stripe = new Stripe(env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-06-20"
      });
    }
    return (_stripe as any)[prop];
  }
});
