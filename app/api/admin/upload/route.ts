import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { commitBinaryFile, isGitHubConfigured } from "@/lib/github";

/**
 * Upload d'une image (logo partenaire) : le fichier est committé dans
 * public/partners/ via l'API GitHub, puis servi après le redéploiement.
 * Renvoie le chemin public à stocker dans le champ concerné.
 */

const MAX_SIZE = 2 * 1024 * 1024; // 2 Mo
const ALLOWED: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "image/gif": "gif",
};

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  if (!isGitHubConfigured()) {
    return NextResponse.json(
      { error: "GitHub non configuré (variables GITHUB_* manquantes)." },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier fourni." }, { status: 422 });
  }

  const ext = ALLOWED[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Format non supporté (PNG, JPEG, WEBP, SVG, GIF)." },
      { status: 415 },
    );
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Fichier trop volumineux (max 2 Mo)." }, { status: 413 });
  }

  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "logo";
  const filename = `${base}-${Date.now()}.${ext}`;
  const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");

  try {
    await commitBinaryFile({
      path: `public/partners/${filename}`,
      base64,
      message: `chore(admin): upload logo ${filename}`,
    });
    return NextResponse.json({ ok: true, path: `/partners/${filename}` });
  } catch (err) {
    console.error("[admin/upload] échec commit GitHub :", err);
    return NextResponse.json(
      { error: "Échec de l'upload sur GitHub.", detail: String(err) },
      { status: 500 },
    );
  }
}
