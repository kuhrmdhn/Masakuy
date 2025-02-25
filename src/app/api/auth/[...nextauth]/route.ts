import { UserRouter } from "@/router/userRouter";
import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOption: NextAuthOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            type: "credentials",
            credentials: {
                username: { label: "Username", placeholder: "John Doe", type: "text" },
                password: { label: "Password", placeholder: "Your Password", type: "password" }
            },
            async authorize(credentials): Promise<any> {
                try {
                    const { username, password } = credentials as { username: string, password: string }
                    const user = await UserRouter.getUser(username, password)
                    return user
                } catch (error) {
                    console.error("Authorize error, ", error)
                    return null
                }
            },
        })
    ],
    pages: {
        signIn: "/signIn",
        newUser: "/signUp",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.username = user.username
            }
            return token
        },
        async session({ session, token }: { session: Session, token: JWT }): Promise<any> {
            if (token) {
                session.user.id = token.id as string
                session.user.name = token.username as string
            }
            return session
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) {
                return url;
            }
            return baseUrl;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
        updateAge: 30 * 24 * 60 * 60
    }
}

const handler = NextAuth(authOption)
export { handler as GET, handler as POST };

