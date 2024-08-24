"use client"
import { UserStore } from '@/store/UserStore'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { NavigationMenu, navigationMenuTriggerStyle } from '../ui/navigation-menu'

const navigationLink = [
    {
        name: "Edit Profile",
        link: "/edit-profile"
    },
    {
        name: "Setting",
        link: "/setting"
    }
]

export default function Profile() {
    const { userData } = UserStore()
    const { photo_profile, username } = userData
    return (
        <section className='h-[100svh] w-1/5 bg-white border-r px-4'>
            <div className='flex flex-col justify-center items-center gap-3 w-full h-1/3'>
                <Image src={photo_profile} alt={`${username} photo profile`} width={100} height={100} className="w-1/2 aspect-square rounded-full" />
                <h2 className='font-semibold text-lg'>{username}</h2>
            </div>
            <div className='flex flex-col gap-3 w-full'>
                {
                    navigationLink.map((navigation, index: number) => (
                        <Link
                            key={index}
                            href={`profile/${navigation.link}`}
                            className={`${navigationMenuTriggerStyle()} h-14 duration-300`}
                        >
                            <NavigationMenu >
                                {navigation.name}
                            </NavigationMenu>
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}
