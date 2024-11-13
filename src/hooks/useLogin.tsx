"use client"
import { UserRouter } from "@/router/userRouter";
import { Session } from "next-auth";
import { getSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useLogin() {
    const searchParams = useSearchParams()
    const [session, setSession] = useState<null | Session>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { getUser, createUser } = UserRouter;
    const router = useRouter();

    async function confirmSession() {
        try {
            const session = await getSession();
            if (session) {
                setSession(session);
            } else {
                throw new Error("Session is undefined");
            }
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    useEffect(() => {
        confirmSession();
    }, []);

    async function handleLogin(username: string, passwordKey: string) {
        setLoading(true);
        try {
            const user = await getUser(username, passwordKey);
            if (user) {
                const loginResponse = await signIn("credentials", {
                    redirect: false,
                    username,
                    password: passwordKey,
                });
                if (loginResponse && loginResponse.ok) {
                    const callbackUrl = searchParams.get("callbackUrl")
                    if (session) {
                        await confirmSession();
                        setSession(session);
                    }
                    router.push(callbackUrl || "/");
                } else if (loginResponse && loginResponse.error) {
                    throw new Error(loginResponse.error);
                }
            } else {
                throw new Error("User not found");
            }
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function handleSignUp(username: string, passwordKey: string) {
        setLoading(true);
        try {
            const user = await getUser(username, passwordKey);
            if (!user) {
                const registerResponse = await createUser(username, passwordKey);
                if (registerResponse) {
                    await signIn("credentials", {
                        redirect: false,
                        username,
                        password: passwordKey,
                    });
                    router.push("/");
                }
            } else {
                throw new Error("User already exists. Would you like to sign in?");
            }
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { session, confirmSession, handleLogin, handleSignUp, loading };
}
