import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin pages (not login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Protect admin API routes (not login, me, or seed for initial setup)
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("token")?.value;
    
    // Allow login, me (for auth check), and seed without token
    const publicAdminRoutes = ["/api/admin/login", "/api/admin/me", "/api/admin/seed"];
    const isPublicRoute = publicAdminRoutes.some(route => pathname.startsWith(route));
    
    if (!isPublicRoute && !token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
