"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/dashboard"
    });

    if ((res as any)?.error) {
      setError("Login fehlgeschlagen. Bitte überprüfen Sie Ihre Zugangsdaten.");
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card animate-slide-up">
        <div className="auth-header">
          <h1>Willkommen zurück</h1>
          <p>Melden Sie sich an, um fortzufahren</p>
        </div>

        <form onSubmit={onSubmit}>
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
              placeholder="••••••••"
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
                Anmelden...
              </span>
            ) : (
              "Anmelden"
            )}
          </button>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}
        </form>

        <div className="auth-footer">
          <p>
            Noch kein Account?{" "}
            <a href="/register">Jetzt registrieren</a>
          </p>
        </div>
      </div>
    </div>
  );
}
