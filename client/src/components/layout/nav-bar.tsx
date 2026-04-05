"use client";

import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";
import type { User } from "next-auth";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface NavBarProps {
  user: User;
}

export function NavBar({ user }: NavBarProps) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{user.name}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/sign-in" })}
          className="gap-2 text-muted-foreground"
        >
          <LogOutIcon data-icon="inline-start" />
          Sign out
        </Button>
      </div>
    </header>
  );
}
