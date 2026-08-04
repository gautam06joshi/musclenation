import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("firebaseAuth")?.value;

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  // 🚫 If NOT logged in → block admin routes
  if (!isLoggedIn && isAdminRoute && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // ✅ If logged in → don't allow going to login page
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}