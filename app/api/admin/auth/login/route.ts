import { NextResponse } from "next/server";
import { verifyCredentials, createSession } from "@/lib/auth";

export async function POST(req: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis." }, { status: 422 });
  }

  const ok = await verifyCredentials(email, password);
  if (!ok) {
    return NextResponse.json({ error: "Identifiants incorrects." }, { status: 401 });
  }

  await createSession(email);
  return NextResponse.json({ ok: true });
}
