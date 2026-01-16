"use client";

import { useState } from "react";
import type { Question } from "@/domain/frameworks/questions";
import type { FrameworkKey } from "@/domain/frameworks";

export default function NewAssessmentClient(props: { frameworkKey: FrameworkKey; questions: Question[] }) {
  const { frameworkKey, questions } = props;
  const [answers, setAnswers] = useState<Record<string, boolean>>(
    Object.fromEntries(questions.map((q) => [q.id, false]))
  );
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function set(id: string, v: boolean) {
    setAnswers((a) => ({ ...a, [id]: v }));
  }

  const answeredCount = Object.values(answers).filter(v => v === true).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  async function submit() {
    setMsg(null);
    setLoading(true);

    const res = await fetch("/api/assessments", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ frameworkKey, answers })
    });

    const data = await res.json().catch(() => ({}));
    setLoading(false);

    if (!res.ok) {
      setMsg(data?.error ?? "Ein Fehler ist aufgetreten.");
      return;
    }
    window.location.href = `/assessments/${data.assessment.id}`;
  }

  return (
    <div className="animate-slide-up" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
      {/* Progress Bar */}
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-small" style={{ fontWeight: 500 }}>Fortschritt</span>
          <span className="text-small" style={{ color: "var(--color-text-tertiary)" }}>
            {answeredCount} von {questions.length} Fragen mit Ja beantwortet
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
            <div className="flex justify-between items-start gap-4">
              <div style={{ flex: 1 }}>
                <div className="text-caption mb-4" style={{ opacity: 0.5 }}>
                  Frage {i + 1}
                </div>
                <div className="assessment-question-text">
                  {q.text}
                </div>
              </div>
              <div className="assessment-options" style={{ flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => set(q.id, true)}
                  className={`assessment-option ${answers[q.id] === true ? "selected-yes" : ""}`}
                  style={{ minWidth: 80 }}
                >
                  Ja
                </button>
                <button
                  type="button"
                  onClick={() => set(q.id, false)}
                  className={`assessment-option ${answers[q.id] === false ? "selected-no" : ""}`}
                  style={{ minWidth: 80 }}
                >
                  Nein
                </button>
              </div>
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
              Speichern...
            </span>
          ) : (
            "Assessment abschließen"
          )}
        </button>

        {msg && (
          <div className="alert alert-error" style={{ maxWidth: 400, margin: "var(--space-4) auto 0" }}>
            {msg}
          </div>
        )}

        <p className="text-small mt-4" style={{ color: "var(--color-text-tertiary)" }}>
          Nach dem Abschließen erhalten Sie Ihren Score und eine Gap-Analyse.
        </p>
      </div>
    </div>
  );
}
