import Profile from '@/components/element/Profile'
import UserFolder from '@/components/element/UserFolder'
import React from 'react'

export default function ProfilePage() {
  return (
    <div className='w-full min-h-[100svh] flex'>
      <Profile />
      <UserFolder />
    </div>
  )
}
