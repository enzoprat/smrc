import fs from "node:fs";
import path from "node:path";

/**
 * Découverte d'images déposées dans public/, au moment du build.
 * Permet au club d'ajouter des photos simplement en déposant les fichiers
 * dans le bon dossier, sans toucher au code.
 */

const IMAGE_RE = /\.(jpe?g|png|webp|avif|gif)$/i;

/** Liste (triée) les images d'un sous-dossier de public/, ex "accueil/carrousel". */
export function listImages(publicSubdir: string): string[] {
  const dir = path.join(process.cwd(), "public", publicSubdir);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_RE.test(f))
      .sort()
      .map((f) => `/${publicSubdir}/${f}`);
  } catch {
    return [];
  }
}

/**
 * Renvoie l'image d'un sous-dossier dont le nom (sans extension) correspond à
 * `baseName`, ex findImage("accueil/categories", "equipe-premiere").
 */
export function findImage(publicSubdir: string, baseName: string): string | undefined {
  const dir = path.join(process.cwd(), "public", publicSubdir);
  try {
    const match = fs
      .readdirSync(dir)
      .find((f) => IMAGE_RE.test(f) && f.replace(IMAGE_RE, "") === baseName);
    return match ? `/${publicSubdir}/${match}` : undefined;
  } catch {
    return undefined;
  }
}
