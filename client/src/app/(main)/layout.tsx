import { auth } from "@/lib/auth/auth";
import { TokenSetter } from "@/components/layout/token-setter";
import { MainNavBar } from "@/components/layout/main-nav-bar";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-[#FFF9F2] text-[#4A3B32] font-sans selection:bg-[#F7B2B7] selection:text-[#4A3B32] flex flex-col">
      <TokenSetter token={session?.accessToken ?? null} expiresAt={session?.accessTokenExpiresAt ?? null} />
      <MainNavBar user={session?.user} />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 md:py-12 flex flex-col">
        {children}
      </main>
    </div>
  );
}
