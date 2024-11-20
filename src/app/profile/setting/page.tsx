"use client"
import { UserStore } from '@/store/UserStore'
import { useShallow } from "zustand/react/shallow"
import React from 'react'
import Input from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PhotoProfile from '@/components/element/profile/PhotoProfile'

export default function SettingPage() {
    const { userData, setUserData } = UserStore(useShallow((state) => ({
        userData: state.userData,
        setUserData: state.setUserData
    })))

    console.log({ userData })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const newUserData = { ...userData, username: e.target.value }
        setUserData(newUserData)
    }

    return (
        <div className='w-full h-full flex justify-center items-center'>
            <form className='w-4/5 h-full flex flex-col items-center gap-7'>
                <PhotoProfile className='w-48' />
                <div className='w-4/5 h-fit px-5 flex flex-col gap-5'>
                    <Input
                        className='text-lg'
                        type="text"
                        placeholder='Username'
                        value={userData.username}
                        onChange={(e) => handleChange(e)}
                    />
                    <Button className='w-fit self-end' type='submit' variant={"main"}>Save</Button>
                </div>
            </form>
        </div>
    )
}
