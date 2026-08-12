"use client";

import { useRef, useState } from "react";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "date"
  | "datetime-local"
  | "select"
  | "file";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
  full?: boolean; // occupe toute la largeur
};

type Row = Record<string, unknown>;

/**
 * Éditeur générique de dataset (liste d'objets) pour l'admin.
 * Ajout / édition / suppression de lignes, puis enregistrement via PUT /api/admin/data/[type].
 */
export function DatasetEditor({
  type,
  fields,
  initial,
  idKey = "id",
  idPrefix,
  template,
  groupField,
  groupLabel = "Filtrer par catégorie",
}: {
  type: string;
  fields: FieldDef[];
  initial: Row[];
  idKey?: string;
  idPrefix: string;
  template: Row;
  /** Champ (ex: "tier") permettant de filtrer et de réordonner par catégorie. */
  groupField?: string;
  groupLabel?: string;
}) {
  // Clé interne stable par ligne : découplée des champs éditables pour ne pas
  // remonter (et perdre le focus) quand l'utilisateur modifie l'identifiant.
  const keyCounter = useRef(0);
  const genKey = () => `row-${keyCounter.current++}`;
  const [rows, setRows] = useState<Row[]>(() => initial.map((r) => ({ ...r, __key: genKey() })));
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<string>("");

  const groupFieldDef = groupField ? fields.find((f) => f.key === groupField) : undefined;
  const groupOptions = groupFieldDef?.options ?? [];

  // Indices (dans `rows`) des lignes actuellement visibles compte tenu du filtre.
  const visibleIndices = rows
    .map((_, idx) => idx)
    .filter((idx) => !groupField || !activeGroup || String(rows[idx][groupField] ?? "") === activeGroup);

  function update(i: number, key: string, value: unknown) {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, [key]: value } : r)));
    setStatus("idle");
  }

  async function uploadFile(i: number, key: string, file: File) {
    setUploadingKey(`${i}-${key}`);
    setStatus("idle");
    setMessage("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        const detail = j.detail ? ` (${j.detail})` : "";
        throw new Error((j.error || "Échec de l'upload.") + detail);
      }
      update(i, key, j.path);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Erreur d'upload.");
    } finally {
      setUploadingKey(null);
    }
  }

  function remove(i: number) {
    if (!confirm("Supprimer cet élément ?")) return;
    setRows((prev) => prev.filter((_, idx) => idx !== i));
    setStatus("idle");
  }

  // `pos` est la position dans la liste visible (filtrée). On échange avec la
  // ligne visible voisine, ce qui réordonne au sein de la catégorie affichée.
  function move(pos: number, dir: -1 | 1) {
    setRows((prev) => {
      const vis = prev
        .map((_, idx) => idx)
        .filter((idx) => !groupField || !activeGroup || String(prev[idx][groupField] ?? "") === activeGroup);
      const from = vis[pos];
      const to = vis[pos + dir];
      if (from === undefined || to === undefined) return prev;
      const next = [...prev];
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
    setStatus("idle");
  }

  function add() {
    const row: Row = { ...template, [idKey]: `${idPrefix}-${Date.now()}`, __key: genKey() };
    if (groupField && activeGroup) row[groupField] = activeGroup;
    setRows((prev) => [row, ...prev]);
    setStatus("idle");
  }

  async function save() {
    setStatus("saving");
    setMessage("");
    // Coerce number fields
    const cleaned = rows.map((r) => {
      const out: Row = { ...r };
      delete out.__key;
      fields.forEach((f) => {
        if (f.type === "number" && out[f.key] !== undefined && out[f.key] !== "") {
          out[f.key] = Number(out[f.key]);
        }
      });
      return out;
    });

    try {
      const res = await fetch(`/api/admin/data/${type}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cleaned }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        const detail = j.detail ? ` (${j.detail})` : "";
        throw new Error((j.error || "Échec de l'enregistrement.") + detail);
      }
      setStatus("saved");
      setMessage("Modifications enregistrées. Le site se met à jour dans quelques instants.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Erreur inconnue.");
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={add} className="btn-dark">
            + Ajouter
          </button>
          {groupField && groupOptions.length > 0 && (
            <label className="flex items-center gap-2 text-sm text-ink-600">
              <span className="font-display text-xs font-semibold uppercase tracking-wide">{groupLabel}</span>
              <select
                value={activeGroup}
                onChange={(e) => setActiveGroup(e.target.value)}
                className="rounded-sm border border-ink-900/15 px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
              >
                <option value="">Toutes les catégories</option>
                {groupOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        <div className="flex items-center gap-3">
          {message && (
            <span className={`text-sm ${status === "error" ? "text-red-600" : "text-emerald-600"}`}>
              {message}
            </span>
          )}
          <button onClick={save} disabled={status === "saving"} className="btn-gold">
            {status === "saving" ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {visibleIndices.length === 0 && (
          <p className="rounded-lg bg-white p-6 text-center text-ink-500 ring-1 ring-black/5">
            Aucun élément. Cliquez sur « Ajouter ».
          </p>
        )}
        {visibleIndices.map((i, pos) => {
          const row = rows[i];
          return (
          <div key={String(row.__key ?? i)} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-black/5">
            <div className="mb-3 flex items-center gap-2 border-b border-black/5 pb-3">
              <span className="font-display text-sm font-bold text-ink-400">#{pos + 1}</span>
              <div className="ml-auto flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => move(pos, -1)}
                  disabled={pos === 0}
                  aria-label="Monter"
                  title="Monter"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-sm ring-1 ring-black/10 hover:bg-bone disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(pos, 1)}
                  disabled={pos === visibleIndices.length - 1}
                  aria-label="Descendre"
                  title="Descendre"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-sm ring-1 ring-black/10 hover:bg-bone disabled:opacity-30"
                >
                  ↓
                </button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.key} className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}>
                  <label className="mb-1 block font-display text-xs font-semibold uppercase tracking-wide text-ink-600">
                    {f.label}
                  </label>
                  {f.type === "textarea" ? (
                    <textarea
                      value={String(row[f.key] ?? "")}
                      onChange={(e) => update(i, f.key, e.target.value)}
                      rows={3}
                      placeholder={f.placeholder}
                      className="w-full rounded-sm border border-ink-900/15 px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={String(row[f.key] ?? "")}
                      onChange={(e) => update(i, f.key, e.target.value)}
                      className="w-full rounded-sm border border-ink-900/15 px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                    >
                      <option value="">—</option>
                      {f.options?.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "file" ? (
                    <div>
                      {row[f.key] ? (
                        <div className="mb-2 flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={String(row[f.key])}
                            alt=""
                            className="h-10 w-auto max-w-[6rem] object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          <span className="truncate text-xs text-ink-500">{String(row[f.key])}</span>
                          <button
                            type="button"
                            onClick={() => update(i, f.key, "")}
                            className="text-xs font-medium text-red-600 hover:underline"
                          >
                            Retirer
                          </button>
                        </div>
                      ) : null}
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
                        disabled={uploadingKey === `${i}-${f.key}`}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadFile(i, f.key, file);
                          e.target.value = "";
                        }}
                        className="block w-full text-sm text-ink-600 file:mr-3 file:rounded-sm file:border-0 file:bg-ink-900 file:px-3 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-white hover:file:bg-ink-700 disabled:opacity-50"
                      />
                      {uploadingKey === `${i}-${f.key}` && (
                        <p className="mt-1 text-xs text-ink-500">Envoi en cours…</p>
                      )}
                    </div>
                  ) : (
                    <input
                      type={f.type}
                      value={String(row[f.key] ?? "")}
                      onChange={(e) => update(i, f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full rounded-sm border border-ink-900/15 px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 text-right">
              <button onClick={() => remove(i)} className="text-sm font-medium text-red-600 hover:underline">
                Supprimer
              </button>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
