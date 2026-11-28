/** Helpers de formatage de dates en français. */

const dateFmt = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortDateFmt = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const timeFmt = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * Renvoie une Date valide, ou null si l'entrée est vide/malformée.
 * Indispensable : un champ date non renseigné depuis l'admin ("") produirait
 * sinon un `RangeError: Invalid time value` qui fait échouer tout le build.
 */
function parseDate(iso: string): Date | null {
  if (!iso) return null;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function formatDate(iso: string): string {
  const d = parseDate(iso);
  return d ? dateFmt.format(d) : "";
}

export function formatShortDate(iso: string): string {
  const d = parseDate(iso);
  return d ? shortDateFmt.format(d) : "";
}

export function formatTime(iso: string): string {
  const d = parseDate(iso);
  return d ? timeFmt.format(d).replace(":", "h") : "";
}

export function formatDayParts(iso: string): { day: string; month: string; weekday: string } {
  const d = parseDate(iso);
  if (!d) return { day: "", month: "", weekday: "" };
  return {
    day: new Intl.DateTimeFormat("fr-FR", { day: "2-digit" }).format(d),
    month: new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(d).replace(".", ""),
    weekday: new Intl.DateTimeFormat("fr-FR", { weekday: "short" }).format(d).replace(".", ""),
  };
}
