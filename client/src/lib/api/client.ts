import { signOut } from "next-auth/react";
import { type ApiResponse } from "@/lib/types/api.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      await signOut({ redirectTo: "/sign-in" });
      throw new ApiClientError("UNAUTHORIZED", "Session expired. Please sign in again.", 401);
    }

    const text = await response.text();
    const body: ApiResponse<T> = text ? JSON.parse(text) : { data: null as unknown as T };

    if (!response.ok || body.error) {
      const message = body.error?.message ?? `Request failed with status ${response.status}`;
      throw new ApiClientError(body.error?.code ?? "UNKNOWN", message, response.status);
    }

    return body.data as T;
  }

  async get<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: "GET" });
  }

  async post<T>(path: string, data?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(path: string, data?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: "DELETE" });
  }

  async upload<T>(path: string, file: File, fieldName = "file"): Promise<T> {
    const formData = new FormData();
    formData.append(fieldName, file);

    const headers: Record<string, string> = {};
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers,
      body: formData,
    });

    if (response.status === 401) {
      await signOut({ redirectTo: "/sign-in" });
      throw new ApiClientError("UNAUTHORIZED", "Session expired. Please sign in again.", 401);
    }

    const text = await response.text();
    const body: ApiResponse<T> = text ? JSON.parse(text) : { data: null as unknown as T };

    if (!response.ok || body.error) {
      const message = body.error?.message ?? `Request failed with status ${response.status}`;
      throw new ApiClientError(body.error?.code ?? "UNKNOWN", message, response.status);
    }

    return body.data as T;
  }
}

export class ApiClientError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

export const apiClient = new ApiClient();
