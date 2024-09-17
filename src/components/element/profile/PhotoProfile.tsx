import { UserStore } from '@/store/UserStore'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useShallow } from 'zustand/react/shallow'

export default function PhotoProfile() {
    const { userData } = UserStore(useShallow((state) => ({ userData: state.userData })))
    const { photo_profile, username } = userData
    return (
        <Link href={"/profile"}>
            <Image src={photo_profile} alt={`${username} photo profile`} width={100} height={100} className="w-1/2 aspect-square rounded-full" />
        </Link>
    )
}
