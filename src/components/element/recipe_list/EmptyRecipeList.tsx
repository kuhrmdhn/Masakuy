import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function EmptyRecipeList() {
    return (
        <section className='w-full h-full flex flex-col justify-center items-center gap-y-5'>
            <Image priority src={"/icons/empty-recipe.svg"} alt="empty recipe" height={2160} width={3840} className='w-32 aspect-auto' />
            <h1 className="text-3xl">No recipes yet</h1>
            <p className='font-light'>Feeling hungry? <Link className='text-primary-app underline underline-offset-2' href={"/"}>Browse recipe!</Link></p>
        </section>
    )
}
