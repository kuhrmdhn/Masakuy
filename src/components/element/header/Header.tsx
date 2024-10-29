"use client"
import React from 'react'
import Logo from './Logo'
import { usePathname } from 'next/navigation'
import SearchBar from './SearchBar'
import Link from 'next/link'

type Props = {
    className?: string
}

const navList = [
    {
        link: "/",
        title: "Home"
    },
    {
        link: "/profile",
        title: "Profile"
    },
    {
        link: "/new-post",
        title: "Upload Recipe"
    },
]

export default function Header({ className, ...props }: Props) {
    const pathname = usePathname()
    const ignoreNavbarPage = ["/signIn", "/signUp"]
    if (ignoreNavbarPage.some((path: string) => pathname == path)) {
        return <></>
    }
    return (
        <header className={`h-16 w-full fixed top-0 z-50 flex justify-between items-center px-7 bg-white ${className}`} {...props}>
            <Logo />
            <div className="w-1/3">
                <SearchBar />
            </div>
        </header>
    )
}
