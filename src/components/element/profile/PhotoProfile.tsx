import { UserStore } from '@/store/UserStore'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useShallow } from 'zustand/react/shallow'

type Props = {
    className?: string
}

export default function PhotoProfile({ className }: Props) {
    const { userData } = UserStore(useShallow((state) => ({ userData: state.userData })))
    const { photo_profile, username } = userData
    return (
            <Image src={photo_profile} alt={`${username} photo profile`} width={500} height={500} className={`w-1/2 aspect-square object-cover object-center rounded-full ${className}`} />
    )
}
