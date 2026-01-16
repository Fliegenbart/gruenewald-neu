import PricingUI from "./ui";

export default function PricingPage() {
  return (
    <>
      <section className="hero" style={{ paddingBottom: "var(--space-10)" }}>
        <div className="container">
          <p className="text-caption animate-fade-in">Pricing</p>
          <h1 className="animate-slide-up" style={{ animationDelay: "0.1s", animationFillMode: "backwards" }}>
            Der richtige Plan für<br />Ihre Compliance-Reise
          </h1>
          <p className="text-large animate-slide-up" style={{ animationDelay: "0.2s", animationFillMode: "backwards" }}>
            Starten Sie kostenlos. Upgraden Sie, wenn Sie bereit sind.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <PricingUI />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" style={{ background: "var(--color-bg-secondary)" }}>
        <div className="container container-md">
          <div className="text-center mb-8">
            <h2>Häufige Fragen</h2>
          </div>

          <div className="card mb-4">
            <h4>Kann ich jederzeit upgraden?</h4>
            <p className="text-small mt-4">
              Ja, Sie können jederzeit von Free auf Pro wechseln. Ihr Fortschritt bleibt erhalten.
            </p>
          </div>

          <div className="card mb-4">
            <h4>Gibt es eine Testphase?</h4>
            <p className="text-small mt-4">
              Der Free-Plan ist unbegrenzt kostenlos. Sie können alle Frameworks einmal testen, bevor Sie sich für Pro entscheiden.
            </p>
          </div>

          <div className="card">
            <h4>Wie funktioniert die Kündigung?</h4>
            <p className="text-small mt-4">
              Sie können Ihr Pro-Abo jederzeit über das Billing-Portal kündigen. Der Zugang bleibt bis zum Ende der Abrechnungsperiode aktiv.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
