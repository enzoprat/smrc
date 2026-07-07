import { NextResponse } from "next/server";
import matter from "gray-matter";
import { getSession } from "@/lib/auth";
import { commitFile, deleteFile, isGitHubConfigured } from "@/lib/github";

/**
 * CRUD des actualités (MDX) via l'API GitHub.
 * POST  : crée ou met à jour content/actualites/{slug}.mdx
 * DELETE: supprime content/actualites/{slug}.mdx
 */

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type NewsPayload = {
  slug?: string;
  originalSlug?: string;
  title?: string;
  date?: string;
  category?: string;
  excerpt?: string;
  image?: string;
  author?: string;
  status?: string;
  seoTitle?: string;
  seoDescription?: string;
  content?: string;
};

function guard(): NextResponse | null {
  if (!isGitHubConfigured()) {
    return NextResponse.json(
      { error: "GitHub non configuré (variables GITHUB_* manquantes)." },
      { status: 503 },
    );
  }
  return null;
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const blocked = guard();
  if (blocked) return blocked;

  let body: NewsPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const title = (body.title || "").trim();
  if (!title) return NextResponse.json({ error: "Le titre est obligatoire." }, { status: 422 });

  const slug = slugify(body.slug || title);
  if (!SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Le slug est invalide." }, { status: 422 });
  }

  const status = body.status === "draft" ? "draft" : "published";
  const date = (body.date || "").trim() || new Date().toISOString().slice(0, 10);

  const frontmatter = {
    title,
    slug,
    date,
    category: (body.category || "Club").trim(),
    excerpt: (body.excerpt || "").trim(),
    image: (body.image || "").trim(),
    author: (body.author || "Le SMRC").trim(),
    status,
    seoTitle: (body.seoTitle || "").trim(),
    seoDescription: (body.seoDescription || "").trim(),
  };

  const fileContent = matter.stringify((body.content || "").trim() + "\n", frontmatter);
  const path = `content/actualites/${slug}.mdx`;

  try {
    // Renommage : si le slug a changé, on supprime l'ancien fichier.
    const originalSlug = body.originalSlug ? slugify(body.originalSlug) : "";
    if (originalSlug && originalSlug !== slug) {
      await deleteFile({
        path: `content/actualites/${originalSlug}.mdx`,
        message: `chore(admin): renomme l'actualité ${originalSlug} → ${slug}`,
      });
    }

    const result = await commitFile({
      path,
      content: fileContent,
      message: `content(admin): ${originalSlug && originalSlug !== slug ? "renomme" : "enregistre"} l'actualité ${slug}`,
    });
    return NextResponse.json({ ok: true, slug, commitUrl: result.commitUrl });
  } catch (err) {
    return NextResponse.json(
      { error: "Échec de l'enregistrement sur GitHub.", detail: String(err) },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

  const blocked = guard();
  if (blocked) return blocked;

  const { searchParams } = new URL(req.url);
  const slug = slugify(searchParams.get("slug") || "");
  if (!SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Slug manquant ou invalide." }, { status: 422 });
  }

  try {
    const result = await deleteFile({
      path: `content/actualites/${slug}.mdx`,
      message: `content(admin): supprime l'actualité ${slug}`,
    });
    if (!result.ok) {
      return NextResponse.json({ error: "Actualité introuvable." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Échec de la suppression sur GitHub.", detail: String(err) },
      { status: 500 },
    );
  }
}
