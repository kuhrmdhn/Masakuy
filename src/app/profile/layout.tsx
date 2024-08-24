"use client"
import { getUserData } from '@/router/userRouter'
import React, { useCallback, useEffect } from 'react'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const fetchUserData = useCallback(async () => {
        try {
            const data = await getUserData()
        } catch (error) {
            console.error(error)
        }
    }, [])

    useEffect(() => {
        fetchUserData()
    }, [fetchUserData])

    return (
        <div>
            {children}
        </div>
    )
}
