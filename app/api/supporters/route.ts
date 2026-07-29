import { NextResponse } from "next/server";

/**
 * Réception des inscriptions supporters (nom, prénom, email, téléphone).
 *
 * Le formulaire est validé et journalisé côté serveur (visible dans les logs
 * Vercel). Pour l'envoyer par email, brancher ici un service (Resend, etc.) —
 * laissé volontairement simple, comme le formulaire de contact.
 */

type Payload = Record<string, string>;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Honeypot anti-spam (champ caché optionnel "website")
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const email = (data.email || "").trim();

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 422 });
  }
  if (data.consent !== "yes") {
    return NextResponse.json({ error: "Consentement requis." }, { status: 422 });
  }

  // Journalisation (à remplacer par un envoi d'email si souhaité)
  console.log("[SUPPORTER]", {
    name: `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim(),
    email,
    phone: data.phone,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
