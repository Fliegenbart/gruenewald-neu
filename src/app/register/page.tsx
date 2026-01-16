"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password, name, company })
    });

    setLoading(false);

    if (res.ok) {
      setMsg({ type: "success", text: "Erfolgreich registriert! Sie können sich jetzt anmelden." });
    } else {
      const data = await res.json().catch(() => ({}));
      setMsg({ type: "error", text: data?.error ?? "Ein Fehler ist aufgetreten." });
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card animate-slide-up">
        <div className="auth-header">
          <h1>Account erstellen</h1>
          <p>Starten Sie kostenlos mit Grünewald</p>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label className="form-label">Ihr Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              placeholder="Max Mustermann"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Firma</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="form-input"
              placeholder="Musterfirma GmbH"
            />
          </div>

          <div className="form-group">
            <label className="form-label">E-Mail-Adresse</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="name@firma.de"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Mind. 8 Zeichen"
              minLength={8}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="loading-spinner" style={{ width: 18, height: 18, borderWidth: 2 }}></span>
                Erstellen...
              </span>
            ) : (
              "Account erstellen"
            )}
          </button>

          {msg && (
            <div className={`alert ${msg.type === "success" ? "alert-success" : "alert-error"}`}>
              {msg.text}
            </div>
          )}
        </form>

        <div className="auth-footer">
          <p>
            Bereits registriert?{" "}
            <a href="/login">Jetzt anmelden</a>
          </p>
        </div>
      </div>
    </div>
  );
}
