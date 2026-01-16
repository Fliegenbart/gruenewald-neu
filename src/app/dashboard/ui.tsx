"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

type User = { id: string; email: string; name: string | null; tier: string };

type Assessment = {
  id: string;
  score: number;
  gapsCount: number;
  createdAt: string;
  framework: { name: string };
};

export default function DashboardClient({ user }: { user: User }) {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/assessments");
    const data = await res.json();
    setAssessments(data.assessments ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function goCheckout(priceId: string) {
    const res = await fetch("/api/billing/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ priceId })
    });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
  }

  async function openPortal() {
    const res = await fetch("/api/billing/portal", { method: "POST" });
    const data = await res.json();
    if (data?.url) window.location.href = data.url;
  }

  const initials = user.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : user.email[0].toUpperCase();

  const avgScore = assessments.length > 0
    ? Math.round(assessments.reduce((sum, a) => sum + a.score, 0) / assessments.length)
    : 0;

  const totalGaps = assessments.reduce((sum, a) => sum + a.gapsCount, 0);

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header animate-fade-in">
          <div>
            <h1 style={{ marginBottom: "var(--space-2)" }}>Dashboard</h1>
            <p>Willkommen zurück, {user.name || user.email}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="user-badge">
              <div className="user-avatar">{initials}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{user.name || user.email}</div>
                <span className="tier-badge">{user.tier}</span>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="btn btn-ghost"
            >
              Abmelden
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid animate-slide-up" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
          <div className="stat-card">
            <div className="stat-label">Assessments</div>
            <div className="stat-value">{assessments.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Ø Score</div>
            <div className="stat-value">{avgScore}%</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Offene Gaps</div>
            <div className="stat-value">{totalGaps}</div>
          </div>
        </div>

        {/* Upgrade Banner (Free Users) */}
        {user.tier === "free" && (
          <div className="upgrade-banner animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
            <h3>Upgrade auf Pro</h3>
            <p>
              Unbegrenzte Assessments, Dashboard-Historie und PDF-Export für Audits.
            </p>
            <button
              onClick={() => goCheckout(process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY || "")}
              className="btn"
            >
              Pro abonnieren — 49€/Monat
            </button>
          </div>
        )}

        {/* Billing Card (Pro Users) */}
        {user.tier !== "free" && (
          <div className="card mb-8 animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
            <div className="flex justify-between items-center">
              <div>
                <h4>Ihr Abo</h4>
                <p className="text-small" style={{ marginTop: "var(--space-1)" }}>
                  Verwalten Sie Ihre Zahlung und Rechnungen
                </p>
              </div>
              <button onClick={openPortal} className="btn btn-secondary">
                Billing Portal
              </button>
            </div>
          </div>
        )}

        {/* Assessments List */}
        <div className="animate-slide-up" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
          <div className="flex justify-between items-center mb-6">
            <h2>Meine Assessments</h2>
            <a href="/" className="btn btn-primary">
              Neuer QuickCheck
            </a>
          </div>

          {loading ? (
            <div className="card text-center" style={{ padding: "var(--space-12)" }}>
              <div className="loading-dots" style={{ justifyContent: "center" }}>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p className="text-small mt-4">Lade Assessments...</p>
            </div>
          ) : assessments.length === 0 ? (
            <div className="empty-state card">
              <div className="empty-state-icon">📋</div>
              <h3>Noch keine Assessments</h3>
              <p style={{ marginBottom: "var(--space-6)" }}>
                Starten Sie Ihren ersten QuickCheck, um Ihren Compliance-Status zu prüfen.
              </p>
              <a href="/" className="btn btn-primary">
                QuickCheck starten
              </a>
            </div>
          ) : (
            <ul className="assessment-list">
              {assessments.map((a, i) => (
                <li key={a.id}>
                  <a
                    href={`/assessments/${a.id}`}
                    className="assessment-item"
                    style={{
                      animationDelay: `${0.4 + i * 0.05}s`,
                      animationFillMode: "backwards"
                    }}
                  >
                    <div className="assessment-info">
                      <div>
                        <div className="assessment-framework">{a.framework.name}</div>
                        <div className="assessment-date">
                          {new Date(a.createdAt).toLocaleDateString("de-DE", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div style={{ textAlign: "right" }}>
                        <div className="text-caption">Gaps</div>
                        <div style={{ fontWeight: 600, color: a.gapsCount > 0 ? "var(--color-warning)" : "var(--color-success)" }}>
                          {a.gapsCount}
                        </div>
                      </div>
                      <div className="assessment-score">{a.score}%</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
