"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

/** Masque le footer public sur les routes /admin. */
export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <Footer />;
}
