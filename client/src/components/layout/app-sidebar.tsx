"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PawPrint, ChefHat, Calendar, Dog } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/pets", label: "My Pets", icon: Dog },
  { href: "/recipes", label: "Recipes", icon: ChefHat },
  { href: "/calendar", label: "Calendar", icon: Calendar },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r bg-sidebar lg:block">
      <div className="flex h-14 items-center gap-2.5 border-b px-6">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <PawPrint className="size-4" />
        </div>
        <span className="font-semibold tracking-tight">PawfectBite</span>
      </div>
      <nav className="flex flex-col gap-1 p-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
