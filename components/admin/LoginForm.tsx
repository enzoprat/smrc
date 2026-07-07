"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Connexion impossible.");
      }
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block font-display text-sm font-semibold uppercase tracking-wide text-ink-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full rounded-sm border border-ink-900/15 px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block font-display text-sm font-semibold uppercase tracking-wide text-ink-700">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-sm border border-ink-900/15 px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </div>
      {error && <p className="text-sm font-medium text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="btn-gold w-full">
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
