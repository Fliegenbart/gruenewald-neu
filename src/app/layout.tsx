import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grünewald Compliance OS",
  description: "Compliance Assessments & Audit Readiness für Life Sciences (DACH)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <nav className="nav">
          <div className="nav-inner">
            <a href="/" className="nav-logo">
              Grünewald
            </a>
            <div className="nav-links">
              <a href="/frameworks" className="nav-link">Frameworks</a>
              <a href="/pricing" className="nav-link">Pricing</a>
              <a href="/dashboard" className="nav-link">Dashboard</a>
              <a href="/login" className="btn btn-primary" style={{ marginLeft: 8 }}>
                Anmelden
              </a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
