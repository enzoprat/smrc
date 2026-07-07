"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteNewsButton({ slug, title }: { slug: string; title: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!confirm(`Supprimer définitivement « ${title} » ?`)) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/news?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Échec de la suppression.");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erreur inconnue.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={remove}
      disabled={busy}
      className="text-sm font-medium text-red-600 hover:underline disabled:opacity-50"
    >
      {busy ? "Suppression..." : "Supprimer"}
    </button>
  );
}
