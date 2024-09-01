import React from 'react'
import { Ubuntu } from 'next/font/google'

const ubuntu = Ubuntu({
    weight: ["300", "400", "500", "700"],
    style: ["italic", "normal"],
    subsets: ["latin"]
})


export default function Logo() {
    return <h1 className={`${ubuntu.className} font-bold text-xl`}>Masa<span className="text-primary-app">kuy!</span></h1>
}
