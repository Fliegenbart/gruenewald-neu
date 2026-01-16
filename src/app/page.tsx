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
            Compliance-Lücken aufdecken,<br />sofort und kostenlos.
          </h1>
          <p className="text-large animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
            Starten Sie jetzt Ihren Quick Audit – ohne Anmeldung, ohne Kosten.<br />
            In 5 Minuten wissen Sie, wo Handlungsbedarf besteht.
          </p>
          <div className="flex gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s", animationFillMode: "backwards" }}>
            <a href="#frameworks" className="btn btn-primary btn-lg">
              Quick Audit starten
            </a>
            <a href="https://www.gruenewald-gmbh.de" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
              Beratung anfragen
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

      {/* How it works */}
      <section className="section" style={{ background: "linear-gradient(135deg, rgba(0, 122, 255, 0.03) 0%, rgba(88, 86, 214, 0.03) 100%)" }}>
        <div className="container">
          <div className="text-center mb-8">
            <p className="text-caption mb-4">So einfach geht&apos;s</p>
            <h2>Quick Audit in 3 Schritten</h2>
          </div>

          <div className="grid grid-3" style={{ maxWidth: 900, margin: "0 auto" }}>
            <div className="card text-center">
              <div style={{
                fontSize: 24,
                fontWeight: 700,
                color: "var(--color-accent)",
                marginBottom: "var(--space-3)"
              }}>1</div>
              <h4>Framework wählen</h4>
              <p className="text-small">ISO 27001, ISO 13485, EU MDR oder EU GMP Annex 11</p>
            </div>
            <div className="card text-center">
              <div style={{
                fontSize: 24,
                fontWeight: 700,
                color: "var(--color-accent)",
                marginBottom: "var(--space-3)"
              }}>2</div>
              <h4>15 Fragen beantworten</h4>
              <p className="text-small">Ja/Nein – in unter 5 Minuten erledigt</p>
            </div>
            <div className="card text-center">
              <div style={{
                fontSize: 24,
                fontWeight: 700,
                color: "var(--color-accent)",
                marginBottom: "var(--space-3)"
              }}>3</div>
              <h4>Ergebnis erhalten</h4>
              <p className="text-small">Score, Lücken-Analyse und nächste Schritte</p>
            </div>
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
              Quick Audit: Kostenlos und ohne Anmeldung. Full Audit: Detaillierte Analyse für Pro-Nutzer.
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
                    <span style={{ opacity: 0.7, marginLeft: 4, fontSize: 12 }}>Kostenlos</span>
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

              <div style={{ textAlign: "left", fontSize: 14 }}>Anmeldung</div>
              <div style={{ color: "var(--color-success)", fontWeight: 600 }}>Nicht nötig</div>
              <div style={{ fontWeight: 600 }}>Erforderlich</div>

              <div style={{ textAlign: "left", fontSize: 14 }}>Verfügbar</div>
              <div style={{ color: "var(--color-success)", fontWeight: 600 }}>Kostenlos</div>
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
            <h2>Compliance-Experten seit 20+ Jahren</h2>
          </div>

          <div className="grid grid-3" style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div className="card text-center">
              <div style={{ fontSize: 32, marginBottom: "var(--space-4)" }}>⚡</div>
              <h4>Sofort-Ergebnis</h4>
              <p className="text-small">Quick Audit ohne Anmeldung – Ihr Score in 5 Minuten</p>
            </div>
            <div className="card text-center">
              <div style={{ fontSize: 32, marginBottom: "var(--space-4)" }}>🎯</div>
              <h4>Klare Handlungsfelder</h4>
              <p className="text-small">Wir zeigen Ihnen exakt, wo Compliance-Lücken bestehen</p>
            </div>
            <div className="card text-center">
              <div style={{ fontSize: 32, marginBottom: "var(--space-4)" }}>🤝</div>
              <h4>Experten-Beratung</h4>
              <p className="text-small">Unsere Consultants helfen bei der Umsetzung</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{
        background: "linear-gradient(135deg, #FFE4B3 0%, #FFD699 100%)",
        borderTop: "2px solid #F5A623",
        borderBottom: "2px solid #F5A623"
      }}>
        <div className="container text-center">
          <div style={{ fontSize: 48, marginBottom: "var(--space-4)" }}>🎯</div>
          <h2 style={{ color: "#8B5A00" }}>Compliance-Lücken geschlossen?</h2>
          <p style={{ maxWidth: 540, margin: "var(--space-4) auto var(--space-6)", color: "#8B5A00" }}>
            Nach dem Quick Audit unterstützen unsere Experten Sie bei der Implementierung aller notwendigen Maßnahmen – von der Dokumentation bis zur Zertifizierung.
          </p>
          <div className="flex gap-4 justify-center" style={{ flexWrap: "wrap" }}>
            <a
              href="https://www.gruenewald-gmbh.de"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg"
              style={{ background: "#8B5A00", color: "white" }}
            >
              Beratungsgespräch vereinbaren
            </a>
            <a href="#frameworks" className="btn btn-lg" style={{ background: "white", color: "#8B5A00" }}>
              Erst Quick Audit starten
            </a>
          </div>
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
            <div>
              <p style={{ fontWeight: 600, marginBottom: "var(--space-2)" }}>Grünewald Compliance OS</p>
              <p className="text-small" style={{ color: "var(--color-text-tertiary)" }}>
                Ein Service der <a href="https://www.gruenewald-gmbh.de" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)" }}>Grünewald GmbH</a>
              </p>
            </div>
            <div className="flex gap-6">
              <a href="https://www.gruenewald-gmbh.de/impressum" target="_blank" rel="noopener noreferrer" className="text-small" style={{ color: "var(--color-text-tertiary)" }}>Impressum</a>
              <a href="https://www.gruenewald-gmbh.de/datenschutz" target="_blank" rel="noopener noreferrer" className="text-small" style={{ color: "var(--color-text-tertiary)" }}>Datenschutz</a>
              <a href="https://www.gruenewald-gmbh.de" target="_blank" rel="noopener noreferrer" className="text-small" style={{ color: "var(--color-text-tertiary)" }}>gruenewald-gmbh.de</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
