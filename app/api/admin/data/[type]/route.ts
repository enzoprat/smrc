import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { commitFile, isGitHubConfigured } from "@/lib/github";

/**
 * Enregistre un dataset JSON (matchs, résultats, partenaires, événements, FAQ)
 * en committant le fichier correspondant dans le dépôt GitHub.
 */

const FILES: Record<string, { path: string; label: string }> = {
  matches: { path: "data/matches.json", label: "matchs" },
  results: { path: "data/results.json", label: "résultats" },
  partners: { path: "data/partners.json", label: "partenaires" },
  events: { path: "data/events.json", label: "événements" },
  faq: { path: "data/faqs.json", label: "FAQ" },
};

export async function PUT(req: Request, { params }: { params: { type: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const target = FILES[params.type];
  if (!target) return NextResponse.json({ error: "Type inconnu." }, { status: 404 });

  if (!isGitHubConfigured()) {
    return NextResponse.json(
      { error: "GitHub non configuré (variables GITHUB_* manquantes)." },
      { status: 503 },
    );
  }

  let body: { items?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (!Array.isArray(body.items)) {
    return NextResponse.json({ error: "Le champ 'items' doit être un tableau." }, { status: 422 });
  }

  const content = JSON.stringify(body.items, null, 2) + "\n";

  try {
    const result = await commitFile({
      path: target.path,
      content,
      message: `chore(admin): mise à jour ${target.label}`,
    });
    return NextResponse.json({ ok: true, commitUrl: result.commitUrl });
  } catch (err) {
    return NextResponse.json(
      { error: "Échec de l'enregistrement sur GitHub.", detail: String(err) },
      { status: 500 },
    );
  }
}
