"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { apiClient } from "@/lib/api/client";

interface TokenSetterProps {
  token: string | null;
  expiresAt: number | null;
}

export function TokenSetter({ token, expiresAt }: TokenSetterProps) {
  useEffect(() => {
    apiClient.setToken(token);

    if (!token || !expiresAt) return;

    const msUntilExpiry = expiresAt - Date.now();

    if (msUntilExpiry <= 0) {
      signOut({ redirectTo: "/sign-in" });
      return;
    }

    // Auto sign-out when the token expires
    const timer = setTimeout(() => {
      signOut({ redirectTo: "/sign-in" });
    }, msUntilExpiry);

    return () => clearTimeout(timer);
  }, [token, expiresAt]);

  return null;
}
