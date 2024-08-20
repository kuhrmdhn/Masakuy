import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata = {
    title: {
        absolute: "Sign In to Masakuy!"
    }
}

type Props = {
    children: React.ReactNode
}

export default function signInLayout({children}: Props) {
  return (
    <section>
      {children}
    </section>
  )
}
