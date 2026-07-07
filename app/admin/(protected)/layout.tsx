import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { isGitHubConfigured } from "@/lib/github";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-bone">
      <AdminSidebar email={session.email} githubReady={isGitHubConfigured()} />
      <div className="lg:pl-64">
        <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
