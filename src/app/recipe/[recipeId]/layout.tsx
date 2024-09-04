import React, { Suspense } from 'react'
import Loading from './Loading'

type Props = {
    children: React.ReactNode
}

export default function layout({ children }: Props) {
    return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    )
}
