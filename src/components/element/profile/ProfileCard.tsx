"use client"
import React from 'react'
import PhotoProfile from './PhotoProfile'
import { UserStore } from '@/store/UserStore'
import { useShallow } from 'zustand/react/shallow'

export default function ProfileCard() {
    const { userData } = UserStore(useShallow((state) => ({
        userData: state.userData
    })))

    return (
        <div className='h-20 w-full flex gap-5 items-center'>
            <PhotoProfile className='h-16 w-16' />
            <h1 className='text-lg font-semibold inline-flex gap-2'>
                <span className="text-primary-app">
                    Hello, 
                </span>
                {userData.username}!
            </h1>
        </div>
    )
}
