import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { NavBar } from "@/components/layout/nav-bar";
import { TokenSetter } from "@/components/layout/token-setter";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <TokenSetter token={session.accessToken ?? null} />
      <AppSidebar />
      <SidebarInset>
        <NavBar user={session.user} />
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
