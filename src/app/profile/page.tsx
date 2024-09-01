import Profile from '@/components/element/header/Profile'
import RecipeFolder from '@/components/element/recipe_list/RecipeFolder'
import React from 'react'

export default function ProfilePage() {
  return (
    <div className='w-full min-h-[100svh] flex'>
      <Profile />
      <RecipeFolder />
    </div>
  )
}
