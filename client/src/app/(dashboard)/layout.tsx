import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { NavBar } from "@/components/layout/nav-bar";
import { TokenSetter } from "@/components/layout/token-setter";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="flex min-h-screen">
      <TokenSetter token={session.accessToken ?? null} />
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <NavBar user={session.user} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
