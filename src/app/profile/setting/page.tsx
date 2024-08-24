"use client"
import { UserStore } from '@/store/UserStore'
import React from 'react'

export default function page() {
    const { userData } = UserStore()
    console.log(userData)
    return (
        <div>
            setting
        </div>
    )
}
