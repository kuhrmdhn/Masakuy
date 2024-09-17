import { RecipeDetails } from '@/types/recipeType'
import Image from 'next/image'
import React from 'react'

type Props = {
  recipe: RecipeDetails
  author: string
}

export default async function RecipePage({ recipe, author }: Props) {
  const { image, title, ingredients, steps } = recipe
  return (
    <section className='w-full lg:w-3/5 min-h-[100svh] h-max flex flex-col items-center gap-7'>
      <div className='h-12 w-full flex items-center pl-7'>
        <p className='font-light'>
          <span className='font-semibold'>{title}</span> by <i className="font-bold">{author}</i>
        </p>
      </div>
      <div className="w-3/4 max-h-[350px] flex justify-center items-center">
        <Image src={image} alt={title} width={200} height={200} className='w-auto h-[250px] sm:h-[350px] aspect-auto' />
      </div>
      <ol className="w-3/4">
        <h2 className="font-semibold">Ingredients</h2>
        {
          ingredients.map((ingredient, index) => (
            <li key={index} className='flex mb-2'>
              <span className='w-7 h-7 flex justify-center items-center rounded-full font-bold bg-primary-app text-white mr-2'>{index + 1}</span>
              {ingredient}
            </li>
          ))
        }
      </ol>
      <ol className="list-decimal w-3/4">
        <h2 className="font-semibold">Steps</h2>
        {
          steps.split("\n").map((step, index) => (
            <li key={index}>
              {step}
            </li>
          ))
        }
      </ol>
    </section>
  )
}
