import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
    title: "New Post"
}

type Props = {
    children: React.ReactNode
}

export default function NewPostLayout({ children }: Props) {
    return (
        <section className='sm:pl-40 lg:pl-52'>
            {children}
        </section>
    )
}
