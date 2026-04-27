import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.id_token) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
        try {
          const res = await fetch(`${apiUrl}/api/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: account.id_token }),
          });
          if (res.ok) {
            const body = await res.json();
            token.accessToken = body.data.token;
            token.userId = body.data.user.id;
            // Store expiry as Unix ms — backend issues 24h tokens (86400000ms)
            token.accessTokenExpiresAt = Date.now() + 86_400_000;
          }
        } catch {
          console.error("Failed to exchange token with backend");
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if (token.userId) {
        session.userId = token.userId as string;
      }
      if (token.accessTokenExpiresAt) {
        session.accessTokenExpiresAt = token.accessTokenExpiresAt as number;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith("/calendar");

      if (isProtected && !isLoggedIn) {
        return Response.redirect(new URL("/sign-in", nextUrl));
      }
      return true;
    },
  },
};
