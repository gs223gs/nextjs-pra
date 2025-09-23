import type { NextAuthConfig } from "next-auth";
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute =
        nextUrl.pathname.startsWith("/dashboard") ||
        nextUrl.pathname.startsWith("/manage");

      // 保護されたルートへの未認証アクセスを拒否（早期リターン）
      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }

      // ログイン済みユーザーのログインページアクセスをリダイレクト（早期リターン）
      if (isLoggedIn && nextUrl.pathname === "/login") {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      // その他のケースは許可
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
