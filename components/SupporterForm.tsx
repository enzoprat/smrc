"use client";

import { useState } from "react";
import { sendEmail } from "@/lib/email";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Formulaire d'inscription supporter (nom, prénom, email, téléphone).
 * Envoi par email via Web3Forms. Même mécanisme que le formulaire de contact.
 */
export function SupporterForm() {
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

    const sent = await sendEmail("Nouveau supporter — inscription site", {
      Nom: `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim(),
      Email: String(data.email ?? ""),
      Téléphone: String(data.phone ?? ""),
      replyto: String(data.email ?? ""),
    });

    if (sent) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setError("Une erreur est survenue. Réessayez ou écrivez-nous directement par email.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg bg-emerald-50 p-8 text-center ring-1 ring-emerald-200">
        <h3 className="font-display text-2xl font-bold uppercase text-emerald-700">Bienvenue !</h3>
        <p className="mt-2 text-emerald-700/80">
          Merci de rejoindre les supporters du SMRC. Le club reviendra vers vous très vite.
        </p>
        <button onClick={() => setStatus("idle")} className="btn-dark mt-6">
          Inscrire une autre personne
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
        <Field name="phone" label="Téléphone" type="tel" required />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-600">
        <input type="checkbox" name="consent" value="yes" className="mt-1 h-4 w-4 accent-gold" />
        <span>
          J'accepte que mes données soient utilisées pour me tenir informé de la vie du club,
          conformément à la{" "}
          <a href="/politique-confidentialite" className="text-gold-700 underline">
            politique de confidentialité
          </a>
          .
        </span>
      </label>

      {status === "error" && <p className="text-sm font-medium text-red-600">{error}</p>}

      <button type="submit" disabled={status === "loading"} className="btn-gold w-full sm:w-auto">
        {status === "loading" ? "Envoi..." : "Rejoindre les supporters"}
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
