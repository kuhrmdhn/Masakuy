import { Button } from '@/components/ui/button'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function AuthButton() {
    const [sessionStatus, setSessionStatus] = useState(false)
    async function checkSession() {
        const session = await getSession()
        if (session) {
            setSessionStatus(true)
        }
    }
    useEffect(() => {
        checkSession()
    }, [])
    return (
        <div className='w-full h-full'>
            {
                sessionStatus ?
                    <Link href="/profile">
                        <Button size={"lg"} variant={"main"}>Profile</Button>
                    </Link>
                    :
                    <div className="flex flex-col gap-3">
                        <Link href="/signIn">
                            <Button size={"lg"} variant={"ghostMain"}>
                                SignIn
                            </Button>
                        </Link>
                        <Link href="/signUp">
                            <Button size={"lg"} variant={"main"}>
                                SignUp
                            </Button>
                        </Link>
                    </div>
            }
        </div>
    )
}
