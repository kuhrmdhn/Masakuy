import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function Loading() {
  return (
    <div className='w-[100dvw] h-[100svh] flex flex-col gap-7'>
      <Skeleton className='w-11/12 h-full'/>
    </div>
  )
}
