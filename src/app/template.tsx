import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function Template({ children }: Props) {
    return (
        <div className='animate-fade-in opacity-0'>
            {children}
        </div>
    )
}
