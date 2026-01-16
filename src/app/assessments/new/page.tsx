import { FRAMEWORKS, type FrameworkKey } from "@/domain/frameworks";
import { getQuestions, type AssessmentType } from "@/domain/frameworks/banks";
import NewAssessmentClient from "./ui";

export default function NewAssessmentPage({
  searchParams
}: {
  searchParams: { framework?: string; type?: string }
}) {
  const frameworkKey = (searchParams.framework ?? "ISO_27001") as FrameworkKey;
  const assessmentType = (searchParams.type === "FULL" ? "FULL" : "QUICK") as AssessmentType;
  const questions = getQuestions(frameworkKey, assessmentType);
  const framework = FRAMEWORKS.find(f => f.key === frameworkKey);

  const isQuick = assessmentType === "QUICK";

  return (
    <div className="section">
      <div className="container container-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center gap-2 mb-4">
            <span className="text-caption">{framework?.short || frameworkKey}</span>
            <span style={{ color: "var(--color-text-tertiary)" }}>•</span>
            <span
              className="text-caption"
              style={{
                color: isQuick ? "var(--color-success)" : "var(--color-accent)"
              }}
            >
              {isQuick ? "Quick Audit" : "Full Audit"}
            </span>
          </div>
          <h1>{isQuick ? "Quick Audit" : "Full Audit"}</h1>
          <p style={{ maxWidth: 480, margin: "var(--space-4) auto 0" }}>
            {isQuick
              ? `${questions.length} Kernfragen für einen schnellen Überblick über Ihren Compliance-Status.`
              : `${questions.length} detaillierte Fragen für eine umfassende Analyse Ihrer Compliance.`
            }
          </p>
        </div>

        {/* Type Badge */}
        <div className="card mb-6 animate-slide-up" style={{
          animationDelay: "0.05s",
          animationFillMode: "backwards",
          background: isQuick ? "var(--color-success-bg)" : "linear-gradient(135deg, var(--color-accent) 0%, #5856d6 100%)",
          color: isQuick ? "var(--color-success)" : "white",
          textAlign: "center",
          padding: "var(--space-4)"
        }}>
          <div className="flex justify-center items-center gap-4">
            <div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>
                {isQuick ? "⚡ Quick Audit" : "📋 Full Audit"}
              </span>
              <span style={{ opacity: 0.8, marginLeft: 8 }}>
                {questions.length} Fragen • ~{isQuick ? "5" : "20"} Minuten
              </span>
            </div>
            {!isQuick && (
              <span style={{
                background: "rgba(255,255,255,0.2)",
                padding: "2px 8px",
                borderRadius: "var(--radius-full)",
                fontSize: 11,
                fontWeight: 600
              }}>
                PRO
              </span>
            )}
          </div>
        </div>

        <NewAssessmentClient
          frameworkKey={frameworkKey}
          assessmentType={assessmentType}
          questions={questions}
        />
      </div>
    </div>
  );
}
