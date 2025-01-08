"use client"
import AuthenticateForm, { AuthType } from "@/components/element/auth/AuthenticateForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useLogin from "@/hooks/useLogin";
import { InputType } from "@/types/InputType";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
    const { handleLogin, loading } = useLogin()
    const [formInputValue, setFormInputValue] = useState({
        username: "",
        password: ""
    });
    const [alert, setAlert] = useState({
        show: false,
        description: ""
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await handleLogin(formInputValue.username, formInputValue.password)
        } catch (error) {
            console.error(error);
            setAlert((state) => ({ ...state, description: "Failed to login, check your username or password" }))
            autoCloseAlert(7000)
            return
        }
    }
    const autoCloseAlert = (duration: number) => {
        setAlert((state) => ({ ...state, show: true }))
        setTimeout(() => {
            setAlert((state) => ({ ...state, show: false }))
        }, duration)
    }
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const key = e.target.id
        setFormInputValue((current) => ({ ...current, [key]: value }))
    }

    const inputData: InputType[] = [
        {
            id: 'username',
            placeholder: 'Username',
            type: 'text',
            value: formInputValue.username,
            required: true,
            handleOnChange: (e) => handleOnChange(e)
        },
        {
            id: 'password',
            placeholder: 'Password',
            type: 'password',
            value: formInputValue.password,
            required: true,
            handleOnChange: (e) => handleOnChange(e)
        }
    ];

    return (
        <>
            <div className="w-full h-[calc(100svh-64px)] flex justify-center items-center gap-7 lg:px-7">
                <section className="w-1/2 lg:flex justify-end items-end hidden">
                    <div className="w-4/5 h-full flex flex-col justify-between">
                        <div className="relative top-10 w-full">
                            <h1 className="text-4xl mb-2 font-semibold">Sign In to Masakuy!</h1>
                            <i className="text-lg">Flavor Journey Begin Here</i>
                        </div>
                        <div className="w-3/4 self-end">
                            <Image src={"/images/sign-in.svg"} alt="Sign in image" height={250} width={250} className="w-full aspect-square" />
                        </div>
                    </div>
                </section>
                <section className="flex flex-col justify-center gap-5 items-center lg:w-1/2 w-full h-4/5">
                    <div className="lg:h-3/5 lg:w-3/5 sm:w-4/5 w-full px-5 flex flex-col justify-between">
                        <h2 className="text-2xl font-semibold">Sign In</h2>
                        <AuthenticateForm
                            inputData={inputData}
                            authType={AuthType.SIGNIN}
                            onSubmit={handleSubmit}
                            loading={loading}
                        />
                    </div>
                    <p className="text-sm font-normal">Don&lsquo;t have an Account?
                        <Link href="/signUp" className="text-primary-app font-semibold ml-2">Register</Link>
                    </p>
                </section>
            </div>
            <Alert variant="destructive" className={`w-fit h-max bg-red-500 bg-opacity-10 fixed top-3 z-[99] duration-300 ${alert.show ? "right-6 visible opacity-100" : "-right-full invisible opacity-0"}`}>
                <span className="absolute top-0 right-2 cursor-pointer" onClick={() => setAlert((state) => ({ ...state, show: false }))}>
                    <X />
                </span>
                <AlertTitle>
                    Warning!
                </AlertTitle>
                <AlertDescription>
                    {alert.description}
                </AlertDescription>
            </Alert>
        </>
    );
}
