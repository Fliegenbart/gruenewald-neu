"use client";

import { useState } from "react";
import type { Question, AssessmentType } from "@/domain/frameworks/banks";
import type { FrameworkKey } from "@/domain/frameworks";

interface Props {
  frameworkKey: FrameworkKey;
  assessmentType: AssessmentType;
  questions: Question[];
}

interface QuickResult {
  score: number;
  gapsCount: number;
  totalQuestions: number;
  gaps: Array<{ id: string; text: string; help?: string }>;
  compliant: Array<{ id: string; text: string }>;
  consultingUrl: string;
  message: string;
}

type FullAnswerStatus = "none" | "partial" | "full";
type FullAnswer = { status: FullAnswerStatus; comment?: string };

export default function NewAssessmentClient({ frameworkKey, assessmentType, questions }: Props) {
  // QUICK: boolean answers, FULL: 3-level + comments
  const [quickAnswers, setQuickAnswers] = useState<Record<string, boolean>>(
    Object.fromEntries(questions.map((q) => [q.id, false]))
  );
  const [fullAnswers, setFullAnswers] = useState<Record<string, FullAnswer>>(
    Object.fromEntries(questions.map((q) => [q.id, { status: "none" as FullAnswerStatus }]))
  );
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

  const [msg, setMsg] = useState<{ type: "error" | "info"; text: string; code?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [quickResult, setQuickResult] = useState<QuickResult | null>(null);

  function setQuick(id: string, v: boolean) {
    setQuickAnswers((a) => ({ ...a, [id]: v }));
  }

  function setFullStatus(id: string, status: FullAnswerStatus) {
    setFullAnswers((a) => ({ ...a, [id]: { ...a[id], status } }));
  }

  function setFullComment(id: string, comment: string) {
    setFullAnswers((a) => ({ ...a, [id]: { ...a[id], comment } }));
  }

  function toggleComment(id: string) {
    setExpandedComments((s) => {
      const newSet = new Set(s);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  }

  // Progress calculation
  const progress = assessmentType === "QUICK"
    ? Math.round((Object.values(quickAnswers).filter(v => v === true).length / questions.length) * 100)
    : Math.round((Object.values(fullAnswers).filter(v => v.status !== "none").length / questions.length) * 100);

  const answeredCount = assessmentType === "QUICK"
    ? Object.values(quickAnswers).filter(v => v === true).length
    : Object.values(fullAnswers).filter(v => v.status !== "none").length;

  async function submit() {
    setMsg(null);
    setLoading(true);

    const answers = assessmentType === "QUICK" ? quickAnswers : fullAnswers;

    // QUICK audits use anonymous endpoint
    if (assessmentType === "QUICK") {
      const res = await fetch("/api/assessments/quick", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ frameworkKey, answers: quickAnswers })
      });

      const data = await res.json().catch(() => ({}));
      setLoading(false);

      if (!res.ok) {
        setMsg({
          type: "error",
          text: data?.error ?? "Ein Fehler ist aufgetreten."
        });
        return;
      }

      // Show results inline
      setQuickResult(data);
      return;
    }

    // FULL audits require authentication
    const res = await fetch("/api/assessments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ frameworkKey, type: assessmentType, answers: fullAnswers })
    });

    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      if (res.status === 401) {
        setMsg({
          type: "info",
          text: "Bitte melden Sie sich an, um den Full Audit durchzuführen.",
          code: "LOGIN_REQUIRED"
        });
      } else if (data.code === "UPGRADE_REQUIRED") {
        setMsg({
          type: "info",
          text: "Full Audit erfordert ein Pro-Abo.",
          code: data.code
        });
      } else {
        setMsg({
          type: "error",
          text: data?.error ?? "Ein Fehler ist aufgetreten."
        });
      }
      return;
    }
    window.location.href = `/assessments/${data.assessment.id}`;
  }

  // Show results for QUICK audit
  if (quickResult) {
    return (
      <div className="animate-slide-up">
        {/* Score Card */}
        <div className="card text-center mb-8" style={{
          background: "linear-gradient(135deg, var(--color-accent) 0%, #007AFF 100%)",
          color: "white",
          padding: "var(--space-8)"
        }}>
          <div className="text-caption mb-2" style={{ opacity: 0.8, color: "white" }}>
            Ihr Compliance-Score
          </div>
          <div style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: "var(--space-2)"
          }}>
            {quickResult.score}%
          </div>
          <div style={{ opacity: 0.9, fontSize: 18 }}>
            {quickResult.totalQuestions - quickResult.gapsCount} von {quickResult.totalQuestions} Anforderungen erfüllt
          </div>
        </div>

        {/* CTA Card */}
        <div className="card mb-8" style={{
          background: "linear-gradient(135deg, #FFE4B3 0%, #FFD699 100%)",
          border: "2px solid #F5A623",
          textAlign: "center"
        }}>
          <div style={{ fontSize: 48, marginBottom: "var(--space-4)" }}>🎯</div>
          <h2 style={{ marginBottom: "var(--space-3)", color: "#8B5A00" }}>
            {quickResult.message}
          </h2>
          <p style={{ color: "#8B5A00", opacity: 0.8, marginBottom: "var(--space-6)" }}>
            Unsere Compliance-Experten bei Grünewald GmbH unterstützen Sie bei der Implementierung aller notwendigen Maßnahmen.
          </p>
          <a
            href={quickResult.consultingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg"
            style={{
              background: "#8B5A00",
              color: "white",
              padding: "var(--space-4) var(--space-8)",
              fontSize: 18
            }}
          >
            Jetzt Beratungsgespräch vereinbaren →
          </a>
        </div>

        {/* Gaps Section */}
        {quickResult.gaps.length > 0 && (
          <div className="card mb-6">
            <h3 className="mb-6" style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <span style={{
                width: 32,
                height: 32,
                borderRadius: "var(--radius-full)",
                background: "rgba(255, 59, 48, 0.1)",
                color: "#FF3B30",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16
              }}>✕</span>
              {quickResult.gapsCount} Compliance-Lücken identifiziert
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              {quickResult.gaps.map((gap, i) => (
                <div
                  key={gap.id}
                  style={{
                    padding: "var(--space-4)",
                    background: "rgba(255, 59, 48, 0.05)",
                    borderRadius: "var(--radius-md)",
                    borderLeft: "3px solid #FF3B30"
                  }}
                >
                  <div style={{ fontWeight: 500, marginBottom: gap.help ? "var(--space-2)" : 0 }}>
                    {i + 1}. {gap.text}
                  </div>
                  {gap.help && (
                    <div className="text-small" style={{ color: "var(--color-text-secondary)" }}>
                      💡 {gap.help}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compliant Section */}
        {quickResult.compliant.length > 0 && (
          <div className="card mb-6">
            <h3 className="mb-6" style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
              <span style={{
                width: 32,
                height: 32,
                borderRadius: "var(--radius-full)",
                background: "rgba(52, 199, 89, 0.1)",
                color: "#34C759",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16
              }}>✓</span>
              {quickResult.compliant.length} Anforderungen erfüllt
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
              {quickResult.compliant.map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    padding: "var(--space-3) var(--space-4)",
                    background: "rgba(52, 199, 89, 0.05)",
                    borderRadius: "var(--radius-md)",
                    borderLeft: "3px solid #34C759",
                    color: "var(--color-text-secondary)"
                  }}
                >
                  {i + 1}. {item.text}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="card text-center" style={{ background: "var(--color-bg-secondary)" }}>
          <p style={{ marginBottom: "var(--space-4)" }}>
            Möchten Sie eine umfassende Compliance-Prüfung? Kontaktieren Sie unsere Experten.
          </p>
          <div style={{ display: "flex", gap: "var(--space-3)", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={quickResult.consultingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Zur Grünewald Beratung
            </a>
            <a href="/" className="btn btn-secondary">
              Neuen Audit starten
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-slide-up" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
      {/* Info Banner for QUICK */}
      {assessmentType === "QUICK" && (
        <div className="card mb-6" style={{
          background: "linear-gradient(135deg, rgba(0, 122, 255, 0.1) 0%, rgba(88, 86, 214, 0.1) 100%)",
          border: "1px solid rgba(0, 122, 255, 0.2)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
            <span style={{ fontSize: 32 }}>⚡</span>
            <div>
              <div style={{ fontWeight: 600, marginBottom: "var(--space-1)" }}>
                Quick Audit – Keine Anmeldung erforderlich
              </div>
              <div className="text-small" style={{ color: "var(--color-text-secondary)" }}>
                Erhalten Sie sofort Ihren Compliance-Score und eine Übersicht Ihrer Lücken.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Banner for FULL */}
      {assessmentType === "FULL" && (
        <div className="card mb-6" style={{
          background: "linear-gradient(135deg, rgba(52, 199, 89, 0.1) 0%, rgba(0, 122, 255, 0.1) 100%)",
          border: "1px solid rgba(52, 199, 89, 0.2)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
            <span style={{ fontSize: 32 }}>📋</span>
            <div>
              <div style={{ fontWeight: 600, marginBottom: "var(--space-1)" }}>
                Full Audit – Detaillierte Compliance-Bewertung
              </div>
              <div className="text-small" style={{ color: "var(--color-text-secondary)", marginBottom: "var(--space-2)" }}>
                Bewerten Sie jeden Punkt mit einem 3-stufigen Status und fügen Sie optional Kommentare hinzu.
              </div>
              <div className="text-small" style={{ display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
                <span>❌ Nicht umgesetzt</span>
                <span>🔶 Teilweise</span>
                <span>✅ Vollständig</span>
                <span>💬 Kommentar</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-small" style={{ fontWeight: 500 }}>Fortschritt</span>
          <span className="text-small" style={{ color: "var(--color-text-tertiary)" }}>
            {assessmentType === "QUICK"
              ? `${answeredCount} von ${questions.length} Fragen mit Ja beantwortet`
              : `${answeredCount} von ${questions.length} Fragen bewertet`}
          </span>
        </div>
        <div style={{
          height: 6,
          background: "var(--color-bg-secondary)",
          borderRadius: "var(--radius-full)",
          overflow: "hidden"
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "var(--color-accent)",
            borderRadius: "var(--radius-full)",
            transition: "width var(--transition-base)"
          }} />
        </div>
      </div>

      {/* Questions */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {questions.map((q, i) => (
          <div
            key={q.id}
            className="assessment-question"
            style={{
              borderRadius: 0,
              marginBottom: 0,
              borderBottom: i < questions.length - 1 ? "1px solid var(--color-divider)" : "none"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
              <div className="flex justify-between items-start gap-4">
                <div style={{ flex: 1 }}>
                  <div className="text-caption mb-4" style={{ opacity: 0.5 }}>
                    Frage {i + 1}
                  </div>
                  <div className="assessment-question-text">
                    {q.text}
                  </div>
                  {q.help && (
                    <p className="text-small mt-4" style={{ color: "var(--color-text-tertiary)" }}>
                      {q.help}
                    </p>
                  )}
                </div>

                {/* QUICK: Ja/Nein buttons */}
                {assessmentType === "QUICK" && (
                  <div className="assessment-options" style={{ flexShrink: 0 }}>
                    <button
                      type="button"
                      onClick={() => setQuick(q.id, true)}
                      className={`assessment-option ${quickAnswers[q.id] === true ? "selected-yes" : ""}`}
                      style={{ minWidth: 80 }}
                    >
                      Ja
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuick(q.id, false)}
                      className={`assessment-option ${quickAnswers[q.id] === false ? "selected-no" : ""}`}
                      style={{ minWidth: 80 }}
                    >
                      Nein
                    </button>
                  </div>
                )}

                {/* FULL: 3-level buttons */}
                {assessmentType === "FULL" && (
                  <div className="assessment-options" style={{ flexShrink: 0, gap: "var(--space-2)" }}>
                    <button
                      type="button"
                      onClick={() => setFullStatus(q.id, "none")}
                      className={`assessment-option ${fullAnswers[q.id]?.status === "none" ? "selected-no" : ""}`}
                      style={{ minWidth: 60, fontSize: 14, padding: "var(--space-2) var(--space-3)" }}
                      title="Nicht umgesetzt"
                    >
                      ❌
                    </button>
                    <button
                      type="button"
                      onClick={() => setFullStatus(q.id, "partial")}
                      className={`assessment-option ${fullAnswers[q.id]?.status === "partial" ? "selected-partial" : ""}`}
                      style={{
                        minWidth: 60,
                        fontSize: 14,
                        padding: "var(--space-2) var(--space-3)",
                        ...(fullAnswers[q.id]?.status === "partial" ? {
                          background: "rgba(255, 149, 0, 0.15)",
                          borderColor: "#FF9500",
                          color: "#FF9500"
                        } : {})
                      }}
                      title="Teilweise umgesetzt"
                    >
                      🔶
                    </button>
                    <button
                      type="button"
                      onClick={() => setFullStatus(q.id, "full")}
                      className={`assessment-option ${fullAnswers[q.id]?.status === "full" ? "selected-yes" : ""}`}
                      style={{ minWidth: 60, fontSize: 14, padding: "var(--space-2) var(--space-3)" }}
                      title="Vollständig umgesetzt"
                    >
                      ✅
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleComment(q.id)}
                      className="assessment-option"
                      style={{
                        minWidth: 40,
                        fontSize: 14,
                        padding: "var(--space-2) var(--space-3)",
                        opacity: expandedComments.has(q.id) || fullAnswers[q.id]?.comment ? 1 : 0.5
                      }}
                      title="Kommentar hinzufügen"
                    >
                      💬
                    </button>
                  </div>
                )}
              </div>

              {/* Comment field for FULL audit */}
              {assessmentType === "FULL" && expandedComments.has(q.id) && (
                <div style={{ marginTop: "var(--space-2)" }}>
                  <textarea
                    placeholder="Optionaler Kommentar (z.B. Status, geplante Maßnahmen, Verantwortlicher...)"
                    value={fullAnswers[q.id]?.comment || ""}
                    onChange={(e) => setFullComment(q.id, e.target.value)}
                    style={{
                      width: "100%",
                      minHeight: 80,
                      padding: "var(--space-3)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-divider)",
                      background: "var(--color-bg-secondary)",
                      fontSize: 14,
                      resize: "vertical"
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Submit */}
      <div className="mt-8 text-center">
        <button
          onClick={submit}
          className="btn btn-primary btn-lg"
          disabled={loading}
          style={{ minWidth: 200 }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="loading-spinner" style={{ width: 18, height: 18, borderWidth: 2 }}></span>
              Auswerten...
            </span>
          ) : (
            assessmentType === "QUICK" ? "Jetzt auswerten" : "Audit abschließen"
          )}
        </button>

        {msg && (
          <div
            className={`alert ${msg.type === "error" ? "alert-error" : ""}`}
            style={{
              maxWidth: 500,
              margin: "var(--space-4) auto 0",
              background: msg.code ? "var(--color-accent-subtle)" : undefined,
              color: msg.code ? "var(--color-accent)" : undefined
            }}
          >
            <p>{msg.text}</p>
            {msg.code === "LOGIN_REQUIRED" && (
              <a
                href="/login"
                className="btn btn-primary"
                style={{ marginTop: "var(--space-3)" }}
              >
                Jetzt anmelden
              </a>
            )}
            {msg.code === "UPGRADE_REQUIRED" && (
              <a
                href="/pricing"
                className="btn btn-primary"
                style={{ marginTop: "var(--space-3)" }}
              >
                Auf Pro upgraden
              </a>
            )}
          </div>
        )}

        <p className="text-small mt-4" style={{ color: "var(--color-text-tertiary)" }}>
          {assessmentType === "QUICK"
            ? "Sie erhalten sofort Ihren Score und eine Gap-Analyse – kostenlos und ohne Anmeldung."
            : "Nach dem Abschließen erhalten Sie Ihren Score und eine detaillierte Gap-Analyse."}
        </p>
      </div>
    </div>
  );
}
