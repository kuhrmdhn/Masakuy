"use client"
import React from 'react'
import Logo from './Logo'
import { usePathname } from 'next/navigation'

type Props = {
    children?: React.ReactNode
    className?: string
}

export default function Header({ children, className, ...props }: Props) {
    const pathname = usePathname()
    const ignoreNavbarPage = ["/profile"]
    if (ignoreNavbarPage.some((path: string) => pathname == path)) {
        return <></>
    }
    return (
        <header className={`h-16 w-full flex items-center px-7 ${className}`} {...props}>
            <Logo />
            {children}
        </header>
    )
}
