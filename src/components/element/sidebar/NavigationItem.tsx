import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type Props = {
    className?: string
    icon?: React.ReactNode
    url: string
    text: string
}

export default function NavigationItem({ className, icon, url, text }: Props) {
    return (
        <Button variant={"ghostMain"} className={`flex gap-3 w-full h-14 items-center hover:text-primary-app ${className}`}>
            {icon}
            <Link
                className="w-full h-full flex items-center"
                href={url}
            >
                {text}
            </Link>
        </Button>
    )
}
