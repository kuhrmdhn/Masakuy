"use client"
import UserRouter from "@/router/userRouter";
import { Session } from "next-auth";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useLogin() {
    const [session, setSession] = useState<null | Session>(null)
    const [loginStatus, setLoginStatus] = useState<boolean>(false)
    const [isNewUser, setIsNewUser] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const { getUser, createUser } = UserRouter
    const { push } = useRouter()
    async function confirmSession() {
        try {
            const session = await getSession()
            if (session) {
                setSession(session)
            } else {
                throw new Error("Session is undefined")
            }
        } catch (error) {
            console.error(error);
            return error
        }
    }

    useEffect(() => {
        confirmSession()
    }, [])

    async function handleLogin(username: string, password: string) {
        setLoading(true)
        const loginResponse = await signIn("credentials", {
            redirect: false,
            username,
            password
        })
        if (loginResponse && loginResponse.ok) {
            if (session) {
                await confirmSession()
                push("/")
                setSession(session)
                setLoginStatus(true)
            }
        } else if (loginResponse && loginResponse.error) {
            setLoading(false)
            throw new Error(loginResponse.error)
        }
    }

    async function handleSignUp(username: string, password: string) {
        console.log(session)
        const loginResponse = await signIn("credentials", {
            redirect: false,
            username,
            password
        })
        console.log(loginResponse)
        if (session) {
            // const id = session.user.id
            // const user = await getUser(id)
            // console.log(user)
            // if (user) {
            //     setIsNewUser(false)
            //     console.log("user ada")
            //     return
            // }
        } else {
            // createUser(username, password)
            // const signUp = await signIn("credentials", {
            //     redirect: false,
            //     username,
            //     password,
            // });
            // if (signUp?.ok) {
            //     setIsNewUser(true)
            //     console.log("signUp success")
            // }
            console.log("create user")
        }
    }
    return { session, loginStatus, isNewUser, handleLogin, handleSignUp, loading }
}