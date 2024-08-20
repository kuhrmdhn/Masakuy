"use client"
import FormInput from "@/components/element/FormInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import useLogin from "@/hooks/useLogin";
import { InputType } from "@/types/InputType";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { z, ZodError } from "zod"

export default function SignInPage() {
    const [formInputValue, setFormInputValue] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [alert, setAlert] = useState({
        show: false,
        description: ""
    })
    const { handleLogin } = useLogin()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { username, password } = formInputValue
        const verifyPasswordInput = verifyPassword()
        if (!verifyPasswordInput) {
            autoCloseAlert(7000)
            return
        }
        handleLogin(username, password)
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
    const verifyPassword = () => {
        const schema = z.object({
            password: z.string().min(8, {
                message: "Must be 8 or more characters long for password"
            }),
            confirmPassword: z.string().min(8, {
                message: "Must be 8 or more characters long and match with password"
            }),
        }).refine((obj) => obj.password === obj.confirmPassword, {
            message: "Confirm passwords must match with password",
            path: ["confirmPassword"]
        })
        const { password, confirmPassword } = formInputValue
        try {
            schema.parse({ password, confirmPassword });
            return true;
        } catch (error) {
            if(error instanceof ZodError) {
                const errorMessages = error.errors.map(err => err.message).join(', ');
                setAlert({
                    show: true,
                    description: errorMessages
                });
                return false;
            }
            return false;
        }
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
        },
        {
            id: 'confirmPassword',
            placeholder: 'Confirm Password',
            type: 'password',
            value: formInputValue.confirmPassword,
            required: true,
            handleOnChange: (e) => handleOnChange(e)
        }
    ];

    return (
        <section className="w-full h-[100svh]">
            <div className="w-full h-[calc(100svh-64px)] flex justify-center items-center gap-7 px-7">
                <section className="w-1/2 h-4/5 lg:flex justify-end items-end hidden">
                    <div className="w-4/5 h-full flex flex-col justify-between">
                        <div className="relative top-10 w-full">
                            <h1 className="text-4xl mb-2 font-semibold">Sign Up to Masakuy!</h1>
                            <i className="text-lg">Flavor Journey Begin Here</i>
                        </div>
                        <div className="w-3/4 self-end">
                            <Image src={"/images/sign-up.svg"} alt="Sign up image" height={250} width={250} className="w-full aspect-square" />
                        </div>
                    </div>
                </section>
                <section className="flex justify-center items-center lg:w-1/2 w-full h-4/5">
                    <div className="h-full lg:w-3/5 w-full px-5 flex flex-col justify-between">
                        <h2 className="text-2xl font-semibold">Sign Up</h2>
                        <form className="h-5/6 w-full flex flex-col gap-7 items-center" onSubmit={handleSubmit}>
                            <FormInput
                                inputData={inputData}
                            />
                            <Button
                                className="bg-primary-app text-white w-full h-12 shadow-lg shadow-primary-app hover:bg-primary-app hover:bg-opacity-80 duration-200"
                                type="submit"
                            >
                                Register
                            </Button>
                            <p className="text-sm font-normal">Have an Account?
                                <a href="/signIn" className="text-primary-app font-semibold ml-2">Login</a>
                            </p>
                        </form>
                    </div>
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
        </section>
    );
}
