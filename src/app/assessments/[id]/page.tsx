import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { prisma } from "@/server/db";
import { getQuestions } from "@/domain/frameworks/banks";
import type { FrameworkKey } from "@/domain/frameworks";

type FullAnswer = { status: "none" | "partial" | "full"; comment?: string };
type Answers = Record<string, boolean> | Record<string, FullAnswer>;

function isFullAnswers(answers: Answers): answers is Record<string, FullAnswer> {
  const firstValue = Object.values(answers)[0];
  return firstValue !== undefined && typeof firstValue === "object" && "status" in firstValue;
}

export default async function AssessmentDetail({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return (
      <div className="auth-container">
        <div className="card text-center" style={{ maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: "var(--space-4)" }}>🔐</div>
          <h2>Assessment ansehen</h2>
          <p style={{ margin: "var(--space-4) 0 var(--space-6)" }}>
            Melden Sie sich an, um dieses Assessment zu sehen.
          </p>
          <a href="/login" className="btn btn-primary btn-lg">
            Anmelden
          </a>
        </div>
      </div>
    );
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } });
  if (!user) {
    return (
      <div className="auth-container">
        <div className="card text-center" style={{ maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: "var(--space-4)" }}>❌</div>
          <h2>Nicht gefunden</h2>
          <p style={{ margin: "var(--space-4) 0 var(--space-6)" }}>Benutzer nicht gefunden.</p>
          <a href="/dashboard" className="btn btn-primary">Zum Dashboard</a>
        </div>
      </div>
    );
  }

  const assessment = await prisma.assessment.findUnique({
    where: { id: params.id },
    include: { framework: true }
  });

  if (!assessment || assessment.userId !== user.id) {
    return (
      <div className="auth-container">
        <div className="card text-center" style={{ maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: "var(--space-4)" }}>❌</div>
          <h2>Nicht gefunden</h2>
          <p style={{ margin: "var(--space-4) 0 var(--space-6)" }}>
            Dieses Assessment existiert nicht oder Sie haben keinen Zugriff.
          </p>
          <a href="/dashboard" className="btn btn-primary">
            Zum Dashboard
          </a>
        </div>
      </div>
    );
  }

  const answers = JSON.parse(assessment.answers) as Answers;
  const isFullAudit = isFullAnswers(answers);
  const questions = getQuestions(assessment.framework.key as FrameworkKey, assessment.type as "QUICK" | "FULL");

  // Build question lookup map
  const questionMap = new Map(questions.map(q => [q.id, q]));

  // Calculate stats
  let compliantCount = 0;
  let partialCount = 0;
  let gapsCount = 0;

  if (isFullAudit) {
    for (const [, answer] of Object.entries(answers)) {
      if (answer.status === "full") compliantCount++;
      else if (answer.status === "partial") partialCount++;
      else gapsCount++;
    }
  } else {
    for (const [, answer] of Object.entries(answers)) {
      if (answer) compliantCount++;
      else gapsCount++;
    }
  }

  const totalQuestions = Object.keys(answers).length;

  return (
    <div className="section">
      <div className="container container-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center gap-2 mb-2">
            <span className="text-caption">{assessment.framework.name}</span>
            <span style={{ color: "var(--color-text-tertiary)" }}>•</span>
            <span className="text-caption" style={{ color: "var(--color-accent)" }}>
              {assessment.type === "FULL" ? "Full Audit" : "Quick Audit"}
            </span>
          </div>
          <h1>Assessment Ergebnis</h1>
          <p style={{ color: "var(--color-text-tertiary)" }}>
            Erstellt am {new Date(assessment.createdAt).toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })}
          </p>
        </div>

        {/* Score Card */}
        <div className="card mb-6 animate-slide-up" style={{
          animationDelay: "0.1s",
          animationFillMode: "backwards",
          background: "linear-gradient(135deg, var(--color-accent) 0%, #5856d6 100%)",
          color: "white",
          textAlign: "center",
          padding: "var(--space-10)"
        }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1 }}>
            {assessment.score}%
          </div>
          <div style={{ fontSize: 18, marginTop: "var(--space-2)", opacity: 0.9 }}>
            Compliance Score
          </div>
        </div>

        {/* Stats */}
        <div className={`grid ${isFullAudit ? "grid-4" : "grid-3"} mb-8 animate-slide-up`} style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
          <div className="stat-card text-center">
            <div className="stat-label">{isFullAudit ? "Vollständig" : "Erfüllt"}</div>
            <div className="stat-value" style={{ color: "var(--color-success)" }}>{compliantCount}</div>
          </div>
          {isFullAudit && (
            <div className="stat-card text-center">
              <div className="stat-label">Teilweise</div>
              <div className="stat-value" style={{ color: "#FF9500" }}>{partialCount}</div>
            </div>
          )}
          <div className="stat-card text-center">
            <div className="stat-label">Gaps</div>
            <div className="stat-value" style={{ color: "var(--color-error)" }}>{gapsCount}</div>
          </div>
          <div className="stat-card text-center">
            <div className="stat-label">Gesamt</div>
            <div className="stat-value">{totalQuestions}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="card mb-8 animate-slide-up" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
          <div className="flex justify-between items-center" style={{ flexWrap: "wrap", gap: "var(--space-4)" }}>
            <div>
              <h4>PDF Export</h4>
              <p className="text-small" style={{ marginTop: "var(--space-1)" }}>
                Laden Sie einen detaillierten Compliance-Bericht herunter
              </p>
            </div>
            <a
              href={`/api/assessments/${assessment.id}?pdf=1`}
              className="btn btn-primary"
            >
              PDF herunterladen
            </a>
          </div>
        </div>

        {/* Answers Detail */}
        <div className="animate-slide-up" style={{ animationDelay: "0.4s", animationFillMode: "backwards" }}>
          <h3 className="mb-4">Antworten im Detail</h3>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            {Object.entries(answers).map(([questionId, answer], i) => {
              const question = questionMap.get(questionId);
              const questionText = question?.text || questionId;

              let statusIcon: string;
              let statusText: string;
              let bgColor: string;
              let textColor: string;
              let comment: string | undefined;

              if (isFullAudit) {
                const fullAnswer = answer as FullAnswer;
                comment = fullAnswer.comment;
                if (fullAnswer.status === "full") {
                  statusIcon = "✅";
                  statusText = "Vollständig";
                  bgColor = "rgba(52, 199, 89, 0.08)";
                  textColor = "var(--color-success)";
                } else if (fullAnswer.status === "partial") {
                  statusIcon = "🔶";
                  statusText = "Teilweise";
                  bgColor = "rgba(255, 149, 0, 0.08)";
                  textColor = "#FF9500";
                } else {
                  statusIcon = "❌";
                  statusText = "Nicht umgesetzt";
                  bgColor = "rgba(255, 59, 48, 0.08)";
                  textColor = "var(--color-error)";
                }
              } else {
                const boolAnswer = answer as boolean;
                if (boolAnswer) {
                  statusIcon = "✓";
                  statusText = "Ja";
                  bgColor = "rgba(52, 199, 89, 0.08)";
                  textColor = "var(--color-success)";
                } else {
                  statusIcon = "✕";
                  statusText = "Nein";
                  bgColor = "rgba(255, 59, 48, 0.08)";
                  textColor = "var(--color-error)";
                }
              }

              return (
                <div
                  key={questionId}
                  style={{
                    padding: "var(--space-4) var(--space-5)",
                    borderBottom: i < Object.entries(answers).length - 1 ? "1px solid var(--color-divider)" : "none",
                    background: bgColor
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-4)" }}>
                    <div style={{ flex: 1 }}>
                      <span className="text-caption" style={{ opacity: 0.5, marginBottom: "var(--space-1)", display: "block" }}>
                        Frage {i + 1}
                      </span>
                      <div style={{ fontSize: 14, lineHeight: 1.5 }}>
                        {questionText}
                      </div>
                      {comment && (
                        <div style={{
                          marginTop: "var(--space-2)",
                          padding: "var(--space-2) var(--space-3)",
                          background: "var(--color-bg-secondary)",
                          borderRadius: "var(--radius-sm)",
                          fontSize: 13,
                          color: "var(--color-text-secondary)"
                        }}>
                          💬 {comment}
                        </div>
                      )}
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-2)",
                      fontWeight: 600,
                      color: textColor,
                      whiteSpace: "nowrap"
                    }}>
                      <span>{statusIcon}</span>
                      <span>{statusText}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <a href="/dashboard" className="btn btn-secondary">
            ← Zurück zum Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
