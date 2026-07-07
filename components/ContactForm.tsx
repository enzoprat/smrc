"use client";

import { useState } from "react";

const SUBJECTS = [
  "Inscription",
  "Partenariat",
  "Presse",
  "Bénévolat",
  "Boutique",
  "Autre",
] as const;

type Status = "idle" | "loading" | "success" | "error";

/**
 * Formulaire de contact du club (pas de devis web).
 * Poste vers /api/contact. Le sujet par défaut peut être pré-rempli (ex: "Partenariat").
 */
export function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (!data.consent) {
      setStatus("error");
      setError("Merci d'accepter la politique de confidentialité.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Une erreur est survenue. Réessayez ou écrivez-nous directement par email.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg bg-emerald-50 p-8 text-center ring-1 ring-emerald-200">
        <h3 className="font-display text-2xl font-bold uppercase text-emerald-700">Message envoyé !</h3>
        <p className="mt-2 text-emerald-700/80">
          Merci pour votre message. Le club vous répondra dans les meilleurs délais.
        </p>
        <button onClick={() => setStatus("idle")} className="btn-dark mt-6">
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="lastName" label="Nom" required />
        <Field name="firstName" label="Prénom" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="email" label="Email" type="email" required />
        <Field name="phone" label="Téléphone" type="tel" />
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block font-display text-sm font-semibold uppercase tracking-wide text-ink-700">
          Sujet
        </label>
        <select
          id="subject"
          name="subject"
          defaultValue={defaultSubject ?? ""}
          required
          className="w-full rounded-sm border border-ink-900/15 bg-white px-4 py-3 text-ink-900 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        >
          <option value="" disabled>
            Sélectionnez un sujet
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-display text-sm font-semibold uppercase tracking-wide text-ink-700">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full rounded-sm border border-ink-900/15 bg-white px-4 py-3 text-ink-900 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-600">
        <input type="checkbox" name="consent" value="yes" className="mt-1 h-4 w-4 accent-gold" />
        <span>
          J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la{" "}
          <a href="/politique-confidentialite" className="text-gold-700 underline">
            politique de confidentialité
          </a>
          .
        </span>
      </label>

      {status === "error" && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button type="submit" disabled={status === "loading"} className="btn-gold w-full sm:w-auto">
        {status === "loading" ? "Envoi..." : "Envoyer le message"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block font-display text-sm font-semibold uppercase tracking-wide text-ink-700">
        {label} {required && <span className="text-gold-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-sm border border-ink-900/15 bg-white px-4 py-3 text-ink-900 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
      />
    </div>
  );
}
