import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: `${process.env.NEXT_AUTH_SECRET}` });
    const { pathname } = req.nextUrl;
    if (!token || token == null) {
        if (pathname !== "/signIn") {
            const callbackUrl = `/signIn?callbackUrl=${pathname}`
            return NextResponse.redirect(new URL(callbackUrl, req.url));
        }
        return NextResponse.next()
    }
}

export const config = {
    matcher: ["/profile/:path*", "/signIn", "/signUp"],
};
