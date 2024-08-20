import React from 'react'
import Logo from './Logo'

type Props = {
    children?: React.ReactNode
    className?:string
}

export default function Header({ children, className, ...props }: Props) {
    return (
        <header className={`h-16 w-full flex items-center px-7 ${className}`} {...props}>
            <Logo/>
            {children}
        </header>
    )
}
