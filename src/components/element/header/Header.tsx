"use client"
import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import { usePathname } from 'next/navigation'
import SearchBar from './SearchBar'

type Props = {
    className?: string
}

export default function Header({ className, ...props }: Props) {
    const [searchBarVisible, setSearchBarVisible] = useState(true)
    const pathname = usePathname()
    const ignoreNavbarPage = ["/signIn", "/signUp"]
    useEffect(() => {
        if (ignoreNavbarPage.some((path: string) => pathname == path)) {
            setSearchBarVisible(false)
        }
    }, [])
    return (
        <header className={`h-16 w-full fixed top-0 z-50 flex justify-between items-center px-7 bg-white ${className}`} {...props}>
            <Logo />
            {
                searchBarVisible &&
                <div className="w-1/3">
                    <SearchBar />
                </div>
            }
        </header>
    )
}
