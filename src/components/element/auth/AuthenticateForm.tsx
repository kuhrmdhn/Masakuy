import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { InputType } from '@/types/InputType'
import { RefreshCw } from 'lucide-react'
import React from 'react'

export enum AuthType {
    REGISTER = "Register",
    SIGNIN = "Sign In"
}

type Props = {
    onSubmit: (e:React.FormEvent) => Promise<void>,
    inputData: InputType[],
    authType: AuthType,
    loading: boolean
}

export default function AuthenticateForm({ inputData, onSubmit, authType, loading }: Props) {
    function submit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        onSubmit(e)
    }

    return (
        <form className="h-5/6 w-full flex flex-col gap-7 items-center" onSubmit={(e) => submit(e)}>
            <div className="space-y-7 w-full">
                {inputData.map(({ id, placeholder, type, handleOnChange, value, required }) => (
                    <Input
                        key={id}
                        id={id}
                        placeholder={placeholder}
                        type={type}
                        className='bg-gray-100'
                        value={value}
                        onChange={handleOnChange}
                        required={required}
                    />
                ))}
            </div>
            <Button
                className={`bg-primary-app text-white w-full h-12 shadow-lg shadow-primary-app hover:bg-primary-app hover:bg-opacity-80 duration-200 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                type="submit"
                disabled={loading}
            >
                {loading ? <span className="animate-spin"><RefreshCw /></span> : authType}
            </Button>
        </form>
    )
}
