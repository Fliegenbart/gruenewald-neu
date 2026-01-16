"use client";

import { useState } from "react";

export default function PricingUI() {
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  async function goCheckout(priceId: string) {
    setErr(null);
    setLoading(priceId);

    const res = await fetch("/api/billing/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ priceId })
    });

    const data = await res.json().catch(() => ({}));
    setLoading(null);

    if (!res.ok) {
      setErr(data?.error ?? "Ein Fehler ist aufgetreten.");
      return;
    }
    if (data?.url) window.location.href = data.url;
  }

  return (
    <>
      <div className="grid grid-3" style={{ maxWidth: 1000, margin: "0 auto", alignItems: "start" }}>
        {/* Free Plan */}
        <div className="pricing-card animate-slide-up" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
          <div className="pricing-header">
            <div className="pricing-name">Free</div>
            <div className="pricing-price">
              0€
              <span className="pricing-period"> / Monat</span>
            </div>
          </div>

          <ul className="pricing-features">
            <li>1 Assessment pro Framework</li>
            <li>Basic Score & Top Gaps</li>
            <li>Sofortiges Ergebnis</li>
            <li>E-Mail-Support</li>
          </ul>

          <a href="/register" className="btn btn-secondary btn-lg w-full">
            Kostenlos starten
          </a>
        </div>

        {/* Pro Plan */}
        <div className="pricing-card featured animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
          <div className="pricing-badge">Beliebt</div>
          <div className="pricing-header">
            <div className="pricing-name">Pro</div>
            <div className="pricing-price">
              49€
              <span className="pricing-period"> / Monat</span>
            </div>
          </div>

          <ul className="pricing-features">
            <li>Unbegrenzte Assessments</li>
            <li>Dashboard & Historie</li>
            <li>PDF-Export für Audits</li>
            <li>Detaillierte Gap-Analyse</li>
            <li>Prioritäts-Support</li>
          </ul>

          <button
            onClick={() => goCheckout(process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY || "")}
            className="btn btn-primary btn-lg w-full"
            disabled={loading === "pro"}
          >
            {loading === "pro" ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading-spinner" style={{ width: 18, height: 18, borderWidth: 2 }}></span>
                Laden...
              </span>
            ) : (
              "Pro abonnieren"
            )}
          </button>
        </div>

        {/* Team Plan */}
        <div className="pricing-card animate-slide-up" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
          <div className="pricing-header">
            <div className="pricing-name">Team</div>
            <div className="pricing-price">
              199€
              <span className="pricing-period"> / Monat</span>
            </div>
          </div>

          <ul className="pricing-features">
            <li>Alles aus Pro</li>
            <li>Multi-User Zugang</li>
            <li>Team Dashboard</li>
            <li>Audit Trail</li>
            <li>Dedicated Support</li>
          </ul>

          <button className="btn btn-secondary btn-lg w-full" disabled>
            Coming Soon
          </button>
        </div>
      </div>

      {err && (
        <div className="alert alert-error" style={{ maxWidth: 400, margin: "var(--space-6) auto 0" }}>
          {err}
        </div>
      )}

      {/* Trust Section */}
      <div className="text-center mt-8" style={{ opacity: 0.7 }}>
        <p className="text-small">
          Sichere Zahlung über Stripe. Jederzeit kündbar.
        </p>
      </div>
    </>
  );
}
