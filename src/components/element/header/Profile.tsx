"use client"
import { UserStore } from '@/store/UserStore'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { NavigationMenu, navigationMenuTriggerStyle } from '../../ui/navigation-menu'
import PhotoProfile from '../profile/PhotoProfile'
import { useShallow } from 'zustand/react/shallow'

const navigationLink = [
    {
        name: "Edit Profile",
        link: "edit-profile"
    },
    {
        name: "New Post",
        link: "new-post"
    },
    {
        name: "Setting",
        link: "setting"
    }
]

export default function Profile() {
    const { userData } = UserStore(useShallow((state) => ({ userData: state.userData })))
    const { username, photo_profile } = userData
    return (
        <section className='w-[20svw] h-full'>
            <h1>Hello World</h1>
        </section>
    )
}
