import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

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

  const res = await fetch(`${process.env.APP_URL}/api/assessments/${params.id}`, { cache: "no-store" });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return (
      <div className="auth-container">
        <div className="card text-center" style={{ maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: "var(--space-4)" }}>❌</div>
          <h2>Nicht gefunden</h2>
          <p style={{ margin: "var(--space-4) 0 var(--space-6)" }}>
            {data?.error ?? "Dieses Assessment existiert nicht oder Sie haben keinen Zugriff."}
          </p>
          <a href="/dashboard" className="btn btn-primary">
            Zum Dashboard
          </a>
        </div>
      </div>
    );
  }

  const a = data.assessment;
  const answers = a.answers as Record<string, boolean>;
  const yesCount = Object.values(answers).filter(v => v === true).length;
  const noCount = Object.values(answers).filter(v => v === false).length;

  return (
    <div className="section">
      <div className="container container-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <p className="text-caption">Assessment Ergebnis</p>
          <h1>{a.framework.name}</h1>
          <p style={{ color: "var(--color-text-tertiary)" }}>
            Erstellt am {new Date(a.createdAt).toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "long",
              year: "numeric"
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
            {a.score}%
          </div>
          <div style={{ fontSize: 18, marginTop: "var(--space-2)", opacity: 0.9 }}>
            Compliance Score
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-3 mb-8 animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
          <div className="stat-card text-center">
            <div className="stat-label">Erfüllt</div>
            <div className="stat-value" style={{ color: "var(--color-success)" }}>{yesCount}</div>
          </div>
          <div className="stat-card text-center">
            <div className="stat-label">Gaps</div>
            <div className="stat-value" style={{ color: "var(--color-warning)" }}>{a.gapsCount}</div>
          </div>
          <div className="stat-card text-center">
            <div className="stat-label">Gesamt</div>
            <div className="stat-value">{yesCount + noCount}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="card mb-8 animate-slide-up" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
          <div className="flex justify-between items-center" style={{ flexWrap: "wrap", gap: "var(--space-4)" }}>
            <div>
              <h4>PDF Export</h4>
              <p className="text-small" style={{ marginTop: "var(--space-1)" }}>
                Laden Sie einen detaillierten Bericht herunter
              </p>
            </div>
            <a
              href={`/api/assessments/${a.id}?pdf=1`}
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
            {Object.entries(answers).map(([questionId, answer], i) => (
              <div
                key={questionId}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "var(--space-4) var(--space-5)",
                  borderBottom: i < Object.entries(answers).length - 1 ? "1px solid var(--color-divider)" : "none",
                  background: answer ? "var(--color-success-bg)" : "var(--color-error-bg)"
                }}
              >
                <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>
                  {questionId}
                </span>
                <span style={{
                  fontWeight: 600,
                  color: answer ? "var(--color-success)" : "var(--color-error)"
                }}>
                  {answer ? "Ja" : "Nein"}
                </span>
              </div>
            ))}
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
