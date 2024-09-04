import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function RecipePageLoading() {
  return (
    <div className='w-3/5 h-[100svh] flex flex-col gap-7'>
      <Skeleton className="w-full h-10" />
      <Skeleton className="w-full h-96" />
      <Skeleton className="w-full h-[25svh]" />
      <Skeleton className="w-full h-[25svh]" />
    </div>
  )
}
