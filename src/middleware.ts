import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: "this is next auth secret" });
    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = "/signIn";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile", "/"],
};
