import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!cookie && pathname !== "/auth") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (cookie && pathname === "/auth") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/profile", "/logout", "/auth"],
};
