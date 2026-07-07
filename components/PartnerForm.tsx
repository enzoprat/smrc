"use client";

import { useState } from "react";

const BUDGETS = ["Moins de 500 €", "500 € – 1 500 €", "1 500 € – 5 000 €", "Plus de 5 000 €", "À définir"];

type Status = "idle" | "loading" | "success" | "error";

/** Formulaire partenaire B2B — poste vers /api/contact avec le sujet "Partenariat". */
export function PartnerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    data.subject = "Partenariat";

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
        <h3 className="font-display text-2xl font-bold uppercase text-emerald-700">Demande envoyée !</h3>
        <p className="mt-2 text-emerald-700/80">
          Merci pour votre intérêt. Le responsable partenariats du club vous recontactera rapidement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <Field name="company" label="Nom de l'entreprise" required />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="contact" label="Personne à contacter" required />
        <Field name="phone" label="Téléphone" type="tel" required />
      </div>
      <Field name="email" label="Email" type="email" required />

      <div>
        <label htmlFor="budget" className="mb-1.5 block font-display text-sm font-semibold uppercase tracking-wide text-ink-700">
          Budget estimé
        </label>
        <select
          id="budget"
          name="budget"
          defaultValue=""
          className="w-full rounded-sm border border-ink-900/15 bg-white px-4 py-3 text-ink-900 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        >
          <option value="">Sélectionnez (optionnel)</option>
          {BUDGETS.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block font-display text-sm font-semibold uppercase tracking-wide text-ink-700">
          Votre projet / message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-sm border border-ink-900/15 bg-white px-4 py-3 text-ink-900 outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-600">
        <input type="checkbox" name="consent" value="yes" className="mt-1 h-4 w-4 accent-gold" />
        <span>
          J'accepte que mes données soient utilisées pour traiter ma demande de partenariat,
          conformément à la{" "}
          <a href="/politique-confidentialite" className="text-gold-700 underline">
            politique de confidentialité
          </a>
          .
        </span>
      </label>

      {status === "error" && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button type="submit" disabled={status === "loading"} className="btn-gold w-full sm:w-auto">
        {status === "loading" ? "Envoi..." : "Envoyer ma demande"}
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
