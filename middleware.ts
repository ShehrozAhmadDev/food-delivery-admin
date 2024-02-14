import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  let role = req?.cookies?.get("role") as any;
  let verify = req?.cookies?.get("token");
  const { pathname } = req.nextUrl;

  if (!verify && (pathname === "/" || pathname.startsWith("/admin"))) {
    return NextResponse.redirect(new URL("/login", req?.url));
  }
  if (
    verify &&
    verify.value &&
    role.value === "admin" &&
    (pathname.startsWith("/login") || pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/admin/dashboard", req?.url));
  }
}
