import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: `${process.env.NEXT_AUTH_SECRET}` });
    const { pathname } = req.nextUrl;
    if (!token || token == null) {
        if (pathname !== "/signIn") {
            const loginUrl = new URL('/signIn', req.url);
            loginUrl.searchParams.set('callbackUrl', req.url);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next()
    }
    try {
        if (pathname.startsWith("/signIn") || pathname.startsWith("/signUp")) {
            const signInUrl = new URL("/", req.url);
            return NextResponse.redirect(signInUrl);
        }
    } catch (error) {
        console.error(error);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/profile/:path*", "/signIn", "/signUp"],
};
