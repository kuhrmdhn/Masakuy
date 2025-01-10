"use client"
import PhotoProfile from '@/components/element/profile/PhotoProfile'
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { BucketStorage } from '@/router/bucketStorage'
import { UserRouter } from '@/router/userRouter'
import { UserStore } from '@/store/UserStore'
import React from 'react'
import { useShallow } from "zustand/react/shallow"

export default function SettingPage() {
    const { userData, setUserData } = UserStore(useShallow((state) => ({
        userData: state.userData,
        setUserData: state.setUserData
    })))

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        let { name, value, files } = e.target
        if (name === "photo_profile" && files) {
            value = URL.createObjectURL(files[0])
            const photoProfileUrl = await BucketStorage.uploadUserImage(files[0])
            UserRouter.editUserData({ ...userData, photo_profile: photoProfileUrl })
        }
        const newUserData = { ...userData, [name]: value }
        setUserData(newUserData)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        UserRouter.editUserData(userData)
    }

    return (
        <div className='w-full h-full flex justify-center items-center sm:pl-40'>
            <form onSubmit={(e) => handleSubmit(e)} className='w-4/5 h-full flex flex-col items-center gap-7'>
                <div className='w-full h-full flex flex-col justify-center items-center gap-10'>
                    <PhotoProfile className='w-48' />
                </div>
                <div className='w-full lg:w-4/5 h-fit lg:px-5 flex flex-col gap-5'>
                    <Input
                        placeholder='Photo Profile'
                        type='file'
                        onChange={(e) => handleChange(e)}
                        name="photo_profile"
                    />
                    <Input
                        className='text-lg'
                        type="text"
                        placeholder='Username'
                        name='username'
                        value={userData.username}
                        onChange={(e) => handleChange(e)}
                    />
                    <Button className='w-fit self-end' type='submit' variant={"main"}>Save</Button>
                </div>
            </form>
        </div>
    )
}
