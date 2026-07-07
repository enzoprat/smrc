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

export function formatDate(iso: string): string {
  return dateFmt.format(new Date(iso));
}

export function formatShortDate(iso: string): string {
  return shortDateFmt.format(new Date(iso));
}

export function formatTime(iso: string): string {
  return timeFmt.format(new Date(iso)).replace(":", "h");
}

export function formatDayParts(iso: string): { day: string; month: string; weekday: string } {
  const d = new Date(iso);
  return {
    day: new Intl.DateTimeFormat("fr-FR", { day: "2-digit" }).format(d),
    month: new Intl.DateTimeFormat("fr-FR", { month: "short" }).format(d).replace(".", ""),
    weekday: new Intl.DateTimeFormat("fr-FR", { weekday: "short" }).format(d).replace(".", ""),
  };
}
