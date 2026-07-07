import { Octokit } from "@octokit/rest";

/**
 * Persistance du contenu via l'API GitHub.
 * Le filesystem Vercel n'étant pas persistant, l'admin écrit des fichiers dans le repo :
 * un commit déclenche un redéploiement Vercel et le contenu est servi au build suivant.
 */

type GitHubConfig = {
  token: string;
  owner: string;
  repo: string;
  branch: string;
};

export function getGitHubConfig(): GitHubConfig | null {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const branch = process.env.GITHUB_BRANCH || "main";
  if (!token || !owner || !repo) return null;
  return { token, owner, repo, branch };
}

export function isGitHubConfigured(): boolean {
  return getGitHubConfig() !== null;
}

function client(cfg: GitHubConfig): Octokit {
  return new Octokit({ auth: cfg.token });
}

/** Récupère le SHA d'un fichier existant (nécessaire pour le mettre à jour). */
async function getFileSha(cfg: GitHubConfig, path: string): Promise<string | undefined> {
  try {
    const res = await client(cfg).repos.getContent({
      owner: cfg.owner,
      repo: cfg.repo,
      path,
      ref: cfg.branch,
    });
    if (!Array.isArray(res.data) && "sha" in res.data) return res.data.sha;
    return undefined;
  } catch {
    return undefined;
  }
}

/** Crée ou met à jour un fichier texte (UTF-8) dans le repo. */
export async function commitFile(args: {
  path: string;
  content: string;
  message: string;
}): Promise<{ ok: boolean; commitUrl?: string }> {
  const cfg = getGitHubConfig();
  if (!cfg) throw new Error("GITHUB_NOT_CONFIGURED");

  const sha = await getFileSha(cfg, args.path);
  const res = await client(cfg).repos.createOrUpdateFileContents({
    owner: cfg.owner,
    repo: cfg.repo,
    path: args.path,
    message: args.message,
    content: Buffer.from(args.content, "utf8").toString("base64"),
    branch: cfg.branch,
    sha,
  });
  return { ok: true, commitUrl: res.data.commit.html_url ?? undefined };
}

/** Supprime un fichier du repo (utilisé pour supprimer une actualité). */
export async function deleteFile(args: {
  path: string;
  message: string;
}): Promise<{ ok: boolean }> {
  const cfg = getGitHubConfig();
  if (!cfg) throw new Error("GITHUB_NOT_CONFIGURED");
  const sha = await getFileSha(cfg, args.path);
  if (!sha) return { ok: false };
  await client(cfg).repos.deleteFile({
    owner: cfg.owner,
    repo: cfg.repo,
    path: args.path,
    message: args.message,
    branch: cfg.branch,
    sha,
  });
  return { ok: true };
}
