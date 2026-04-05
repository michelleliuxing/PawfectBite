"use client";

import { useEffect } from "react";
import { apiClient } from "@/lib/api/client";

export function TokenSetter({ token }: { token: string | null }) {
  useEffect(() => {
    apiClient.setToken(token);
  }, [token]);
  return null;
}
