import ProfileCard from '@/components/element/profile/ProfileCard'
import RecipeFolder from '@/components/element/recipe_list/RecipeFolder'
import React from 'react'

export default function ProfilePage() {
  return (
    <div className='w-full h-[calc(100svh-80px)] flex flex-col'>
      <ProfileCard />
      <RecipeFolder />
    </div>
  )
}
