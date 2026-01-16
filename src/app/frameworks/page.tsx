import { FRAMEWORKS } from "@/domain/frameworks";

const frameworkIcons: Record<string, string> = {
  ISO_27001: "🔒",
  ISO_13485: "🏥",
  EU_MDR: "🇪🇺",
  EU_GMP_ANNEX_11: "💊"
};

const frameworkDescriptions: Record<string, string> = {
  ISO_27001: "Informationssicherheits-Managementsystem für sichere Datenverarbeitung und Datenschutz in regulierten Umgebungen.",
  ISO_13485: "Qualitätsmanagementsystem speziell für die Entwicklung und Herstellung von Medizinprodukten.",
  EU_MDR: "Die europäische Medizinprodukteverordnung 2017/745 mit strengen Anforderungen an Sicherheit und Leistung.",
  EU_GMP_ANNEX_11: "Anforderungen an computergestützte Systeme in der pharmazeutischen Herstellung und Qualitätskontrolle."
};

export default function FrameworksPage() {
  return (
    <>
      <section className="hero" style={{ paddingBottom: "var(--space-10)" }}>
        <div className="container">
          <p className="text-caption animate-fade-in">Compliance Frameworks</p>
          <h1 className="animate-slide-up" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
            Unterstützte Frameworks
          </h1>
          <p className="text-large animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
            Grünewald unterstützt die wichtigsten Compliance-Standards für Life Sciences.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-2" style={{ maxWidth: 900, margin: "0 auto" }}>
            {FRAMEWORKS.map((f, i) => (
              <div
                key={f.key}
                className="card animate-slide-up"
                style={{ animationDelay: `${0.1 + i * 0.1}s`, animationFillMode: "backwards" }}
              >
                <div style={{
                  fontSize: 40,
                  marginBottom: "var(--space-4)",
                  width: 64,
                  height: 64,
                  background: "var(--color-bg-secondary)",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {frameworkIcons[f.key] || "📋"}
                </div>

                <h3 style={{ marginBottom: "var(--space-2)" }}>{f.name}</h3>
                <p className="text-caption mb-4" style={{ color: "var(--color-text-tertiary)" }}>{f.key}</p>
                <p style={{ fontSize: 15, marginBottom: "var(--space-6)" }}>
                  {frameworkDescriptions[f.key] || "Compliance Framework für regulierte Industrien."}
                </p>

                <a href={`/assessments/new?framework=${f.key}`} className="btn btn-primary">
                  QuickCheck starten
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container container-md text-center">
          <h2>Weitere Frameworks?</h2>
          <p style={{ margin: "var(--space-4) auto var(--space-6)", maxWidth: 500 }}>
            Wir erweitern kontinuierlich unsere Framework-Bibliothek. Kontaktieren Sie uns, wenn Sie einen spezifischen Standard benötigen.
          </p>
          <a href="mailto:kontakt@gruenewald.de" className="btn btn-secondary">
            Kontakt aufnehmen
          </a>
        </div>
      </section>
    </>
  );
}
