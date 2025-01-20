"use client"
import React, { Suspense } from 'react'

type Props = {
    children: React.ReactNode
}

export default function SuspenseProvider({ children }: Props) {
    return (
        <Suspense>
            {children}
        </Suspense>
    )
}
