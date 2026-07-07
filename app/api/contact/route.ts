import { NextResponse } from "next/server";

/**
 * Réception des messages de contact / partenariat.
 *
 * Par défaut, le message est validé et journalisé côté serveur (visible dans les
 * logs Vercel). Pour l'envoyer par email, brancher ici un service (Resend, etc.)
 * via une variable d'environnement — laissé volontairement simple.
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
  const message = (data.message || "").trim();

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Email invalide." }, { status: 422 });
  }
  if (data.subject !== "Partenariat" && message.length < 5) {
    return NextResponse.json({ error: "Message trop court." }, { status: 422 });
  }
  if (data.consent !== "yes") {
    return NextResponse.json({ error: "Consentement requis." }, { status: 422 });
  }

  // Journalisation (à remplacer par un envoi d'email si souhaité)
  console.log("[CONTACT]", {
    subject: data.subject,
    name: `${data.firstName ?? ""} ${data.lastName ?? ""}`.trim() || data.contact,
    company: data.company,
    email,
    phone: data.phone,
    budget: data.budget,
    message: message.slice(0, 2000),
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
