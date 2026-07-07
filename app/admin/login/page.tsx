import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Connexion — Espace club",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-5 py-16">
      <div className="absolute inset-0 bg-grain opacity-40" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-sm bg-gold font-display text-xl font-extrabold text-ink-900">
            SM
          </span>
          <h1 className="font-display text-2xl font-bold uppercase text-white">Espace club</h1>
          <p className="mt-1 text-sm text-white/50">Administration du site SMRC</p>
        </div>
        <div className="rounded-lg bg-white p-8 shadow-card">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-white/40">
          Accès réservé aux responsables du club.
        </p>
      </div>
    </div>
  );
}
