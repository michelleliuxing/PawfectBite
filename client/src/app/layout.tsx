import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { SessionProvider } from "@/providers/session-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";

const nunito = Nunito({ 
  variable: "--font-nunito", 
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "PawfectBite | Cozy, Vet-Safe Pet Meals",
  description: "AI-powered personalized, veterinary-safe homemade meal recipes for dogs and cats.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${nunito.variable} font-sans antialiased bg-[#FFF9F2]`}>
        <SessionProvider>
          <QueryProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
