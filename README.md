# Grünewald Compliance OS — Starter Codebase (Next.js + Prisma + Stripe)

This is a **production-leaning starter** for your planned Compliance SaaS:
- **Next.js (App Router) + TypeScript**
- **PostgreSQL + Prisma**
- **Auth**: email+password (credentials) using NextAuth + Prisma adapter
- **Billing**: Stripe Checkout + Customer Portal + Webhooks
- **Core domain**: Frameworks (ISO 27001, ISO 13485, EU MDR, EU GMP Annex 11), Assessments, Scoring, Paywall

> Goal: give you a clean baseline to continue in Cloud VS Code/Claude Code.

---

## 1) Quick start (local)

### Requirements
- Node.js 20+
- Docker (for Postgres) **or** any Postgres instance
- pnpm (recommended) or npm

### Setup
1. Copy env:
   ```bash
   cp .env.example .env
   ```

2. Start Postgres (optional via Docker):
   ```bash
   docker compose up -d
   ```

3. Install deps:
   ```bash
   pnpm install
   ```

4. Migrate & seed:
   ```bash
   pnpm prisma:migrate
   pnpm prisma:seed
   ```

5. Run:
   ```bash
   pnpm dev
   ```

Open http://localhost:3000

---

## 2) Stripe setup (test mode)

Create products/prices in Stripe and fill:
- STRIPE_PRICE_PRO_MONTHLY
- STRIPE_PRICE_TEAM_MONTHLY

Then forward webhooks:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

---

## 3) What’s included (routes)

- `/` landing (quick check CTA)
- `/pricing`
- `/login`, `/register`
- `/dashboard` (requires login)
- `/assessments/new?framework=ISO_27001`
- `/assessments/[id]`

API (Next.js route handlers):
- `POST /api/auth/register`
- `GET  /api/auth/me`
- `GET/POST /api/assessments`
- `GET/PUT/DELETE /api/assessments/[id]`
- `POST /api/billing/checkout`
- `POST /api/billing/portal`
- `POST /api/stripe/webhook`

---

## 4) Paywall rules (current)
- **Free**: max **1 assessment per framework**, no PDF export, no history dashboard (you can change this)
- **Pro/Team**: unlimited assessments + dashboard + export placeholder

Server-side checks live in:
- `src/server/subscription.ts`
- `src/server/paywall.ts`

---

## 5) Next steps (recommended)
1. Flesh out `frameworks` and question sets in `src/domain/frameworks/*`
2. Implement real scoring & gap logic in `src/domain/scoring/*`
3. Replace PDF placeholder in `src/server/pdf.ts` with your final report template
4. Add Team tier: orgs, members, roles, audit trail

---

## License
MIT (adjust as needed).
