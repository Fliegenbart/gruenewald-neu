import { FRAMEWORKS } from "@/domain/frameworks";

const frameworkIcons: Record<string, string> = {
  ISO_27001: "🔒",
  ISO_13485: "🏥",
  EU_MDR: "🇪🇺",
  EU_GMP_ANNEX_11: "💊"
};

const frameworkDescriptions: Record<string, string> = {
  ISO_27001: "Informationssicherheits-Managementsystem für sichere Datenverarbeitung",
  ISO_13485: "Qualitätsmanagementsystem für Medizinprodukte",
  EU_MDR: "Europäische Medizinprodukteverordnung 2017/745",
  EU_GMP_ANNEX_11: "Computergestützte Systeme in der pharmazeutischen Herstellung"
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <p className="text-caption animate-fade-in">Compliance für Life Sciences</p>
          <h1 className="animate-slide-up" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
            Audit-Ready in Minuten,<br />nicht Monaten.
          </h1>
          <p className="text-large animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
            Starten Sie mit einem QuickCheck für Ihr Framework.
            Identifizieren Sie Gaps und werden Sie compliant – einfach und effizient.
          </p>
          <div className="flex gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
            <a href="#frameworks" className="btn btn-primary btn-lg">
              QuickCheck starten
            </a>
            <a href="/pricing" className="btn btn-secondary btn-lg">
              Pricing ansehen
            </a>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section-sm" style={{ background: "var(--color-bg-secondary)", borderTop: "1px solid var(--color-divider)", borderBottom: "1px solid var(--color-divider)" }}>
        <div className="container">
          <div className="flex justify-center gap-6" style={{ flexWrap: "wrap", opacity: 0.7 }}>
            <span className="text-caption">Pharma</span>
            <span style={{ color: "var(--color-text-tertiary)" }}>•</span>
            <span className="text-caption">MedTech</span>
            <span style={{ color: "var(--color-text-tertiary)" }}>•</span>
            <span className="text-caption">Biotech</span>
            <span style={{ color: "var(--color-text-tertiary)" }}>•</span>
            <span className="text-caption">DACH Region</span>
          </div>
        </div>
      </section>

      {/* Frameworks Section */}
      <section id="frameworks" className="section">
        <div className="container">
          <div className="text-center mb-8">
            <p className="text-caption mb-4">Compliance Frameworks</p>
            <h2>Wählen Sie Ihr Framework</h2>
            <p style={{ maxWidth: 540, margin: "var(--space-4) auto 0" }}>
              Starten Sie einen QuickCheck und erhalten Sie sofort einen Überblick über Ihren Compliance-Status.
            </p>
          </div>

          <div className="grid grid-2" style={{ maxWidth: 800, margin: "0 auto" }}>
            {FRAMEWORKS.map((f, i) => (
              <a
                key={f.key}
                href={`/assessments/new?framework=${f.key}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="framework-card animate-slide-up"
                  style={{ animationDelay: `${0.1 + i * 0.1}s`, animationFillMode: "backwards" }}
                >
                  <div className="framework-icon">
                    {frameworkIcons[f.key] || "📋"}
                  </div>
                  <h3>{f.short}</h3>
                  <p>{frameworkDescriptions[f.key] || f.name}</p>
                  <span className="framework-arrow">
                    QuickCheck starten →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container">
          <div className="text-center mb-8">
            <p className="text-caption mb-4">Warum Grünewald?</p>
            <h2>Compliance neu gedacht</h2>
          </div>

          <div className="grid grid-3" style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div className="card text-center">
              <div style={{ fontSize: 32, marginBottom: "var(--space-4)" }}>⚡</div>
              <h4>Schnell</h4>
              <p className="text-small">QuickCheck in unter 10 Minuten abschließen</p>
            </div>
            <div className="card text-center">
              <div style={{ fontSize: 32, marginBottom: "var(--space-4)" }}>🎯</div>
              <h4>Präzise</h4>
              <p className="text-small">Klare Gap-Analyse mit priorisierten Maßnahmen</p>
            </div>
            <div className="card text-center">
              <div style={{ fontSize: 32, marginBottom: "var(--space-4)" }}>📊</div>
              <h4>Nachvollziehbar</h4>
              <p className="text-small">Dashboard, Historie und PDF-Reports für Audits</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container text-center">
          <h2>Bereit für Ihren ersten QuickCheck?</h2>
          <p style={{ maxWidth: 480, margin: "var(--space-4) auto var(--space-6)" }}>
            Kostenlos starten. Keine Kreditkarte erforderlich.
          </p>
          <a href="/register" className="btn btn-primary btn-lg">
            Jetzt registrieren
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "var(--space-8) 0",
        borderTop: "1px solid var(--color-divider)",
        background: "var(--color-bg)"
      }}>
        <div className="container">
          <div className="flex justify-between items-center" style={{ flexWrap: "wrap", gap: "var(--space-4)" }}>
            <p className="text-small" style={{ color: "var(--color-text-tertiary)" }}>
              © 2024 Grünewald Compliance OS
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-small" style={{ color: "var(--color-text-tertiary)" }}>Impressum</a>
              <a href="#" className="text-small" style={{ color: "var(--color-text-tertiary)" }}>Datenschutz</a>
              <a href="#" className="text-small" style={{ color: "var(--color-text-tertiary)" }}>AGB</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
