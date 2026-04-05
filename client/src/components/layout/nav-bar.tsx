"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import type { User } from "next-auth";

interface NavBarProps {
  user: User;
}

export function NavBar({ user }: NavBarProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-6">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{user.name}</span>
        <button
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
          className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </div>
    </header>
  );
}
