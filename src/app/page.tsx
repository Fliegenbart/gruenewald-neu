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
            Wählen Sie zwischen Quick Audit (15 Fragen) für einen schnellen Überblick<br />
            oder Full Audit (50 Fragen) für eine umfassende Analyse.
          </p>
          <div className="flex gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
            <a href="#frameworks" className="btn btn-primary btn-lg">
              Audit starten
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
              Quick Audit für einen schnellen Check, Full Audit für die komplette Analyse.
            </p>
          </div>

          <div className="grid grid-2" style={{ maxWidth: 900, margin: "0 auto" }}>
            {FRAMEWORKS.map((f, i) => (
              <div
                key={f.key}
                className="card animate-slide-up"
                style={{ animationDelay: `${0.1 + i * 0.1}s`, animationFillMode: "backwards" }}
              >
                <div className="framework-icon" style={{ marginBottom: "var(--space-4)" }}>
                  {frameworkIcons[f.key] || "📋"}
                </div>
                <h3 style={{ marginBottom: "var(--space-2)" }}>{f.short}</h3>
                <p style={{ fontSize: 14, marginBottom: "var(--space-5)" }}>
                  {frameworkDescriptions[f.key] || f.name}
                </p>

                <div className="flex gap-3" style={{ flexWrap: "wrap" }}>
                  <a
                    href={`/assessments/new?framework=${f.key}&type=QUICK`}
                    className="btn btn-primary"
                    style={{ flex: 1, minWidth: 120 }}
                  >
                    Quick Audit
                    <span style={{ opacity: 0.7, marginLeft: 4, fontSize: 12 }}>15 Fragen</span>
                  </a>
                  <a
                    href={`/assessments/new?framework=${f.key}&type=FULL`}
                    className="btn btn-secondary"
                    style={{ flex: 1, minWidth: 120 }}
                  >
                    Full Audit
                    <span style={{ opacity: 0.7, marginLeft: 4, fontSize: 12 }}>Pro</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="card mt-8" style={{ maxWidth: 600, margin: "var(--space-10) auto 0" }}>
            <h4 className="text-center mb-6">Quick vs. Full Audit</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--space-4)", textAlign: "center" }}>
              <div></div>
              <div className="text-caption">Quick</div>
              <div className="text-caption">Full</div>

              <div style={{ textAlign: "left", fontSize: 14 }}>Fragen</div>
              <div style={{ fontWeight: 600 }}>15</div>
              <div style={{ fontWeight: 600 }}>50</div>

              <div style={{ textAlign: "left", fontSize: 14 }}>Dauer</div>
              <div style={{ fontWeight: 600 }}>~5 Min</div>
              <div style={{ fontWeight: 600 }}>~20 Min</div>

              <div style={{ textAlign: "left", fontSize: 14 }}>Detailtiefe</div>
              <div style={{ fontWeight: 600 }}>Überblick</div>
              <div style={{ fontWeight: 600 }}>Umfassend</div>

              <div style={{ textAlign: "left", fontSize: 14 }}>Verfügbar</div>
              <div style={{ color: "var(--color-success)", fontWeight: 600 }}>Free</div>
              <div style={{ color: "var(--color-accent)", fontWeight: 600 }}>Pro</div>
            </div>
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
              <p className="text-small">Quick Audit in unter 5 Minuten abschließen</p>
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
          <h2>Bereit für Ihren ersten Audit?</h2>
          <p style={{ maxWidth: 480, margin: "var(--space-4) auto var(--space-6)" }}>
            Kostenlos starten mit Quick Audit. Keine Kreditkarte erforderlich.
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
