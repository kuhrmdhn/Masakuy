import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: `${process.env.NEXT_AUTH_SECRET}`,
  });
  const { pathname } = req.nextUrl;
  // if user logged in but visit auth page
  if (token && ["/signIn", "/signUp"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // if user not logged in and visit auth feature page
  if (!token && !["/signIn", "/signUp", "/"].includes(pathname)) {
    const callbackUrl = `/signIn?callbackUrl=${pathname}`;
    return NextResponse.redirect(new URL(callbackUrl, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/signIn", "/signUp", "/new-post"],
};
