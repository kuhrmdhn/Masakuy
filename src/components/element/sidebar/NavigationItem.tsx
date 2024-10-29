import Link from 'next/link'
import React from 'react'

type Props = {
    className?: string
    icon: React.ReactNode
    url: string
    text: string
}

export default function NavigationItem({ className, icon, url, text }: Props) {
    return (
        <div className={`flex gap-3 items-center w-4/5 h-14 pl-3 border rounded hover:text-white hover:bg-primary-app/75 hover:scale-110 duration-300 ${className}`}>
            {icon}
            <Link
                className="w-full h-full flex items-center"
                href={url}
            >
                {text}
            </Link>
        </div>
    )
}
