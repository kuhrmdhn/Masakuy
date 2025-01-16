import { RecipeDetails } from '@/types/recipeType'
import { Open_Sans } from 'next/font/google'
import Image from 'next/image'
import RecipeContentList from './RecipeContentList'
import RecipeInfo from './RecipeInfo'
import SaveRecipeButton from './SaveRecipeButton'

type Props = {
  recipe: RecipeDetails
  author: string
}

const openSans = Open_Sans({
  weight: "500",
  display: "swap",
  subsets: ["latin"]
})

export default async function RecipePage({ recipe, author }: Props) {
  const { image, title, ingredients, steps } = recipe
  return (
    <>
      <section className='w-full sm:w-5/6 min-h-[100svh] h-max flex justify-center'>
        <div className="w-3/4 h-max flex flex-col gap-7">
          <section className='animate-rise-up flex flex-col items-center lg:items-start lg:flex-row gap-4 lg:gap-10'>
            <Image
              alt={`${title} Image`}
              src={image}
              width={1080}
              height={1920}
              className='h-80 sm:h-[420px] w-64 sm:w-72 object-cover object-center rounded-xl opacity-0 animate-rise-up delay-150'
            />
            <div className='flex flex-col gap-5 w-1/3'>
              <div>
                <h1 className='font-bold text-2xl'>{title}</h1>
                <p>Created by
                  <span className='font-bold text-zinc-600 ml-1'>{author}</span>
                </p>
              </div>
              <div className='flex w-full gap-5'>
                <RecipeInfo
                  className='lg:w-full h-12 lg:h-16'
                  recipe={recipe}
                />
                <SaveRecipeButton
                  recipe={recipe}
                />
              </div>
            </div>
          </section>
          <section className={`w-full h-full flex flex-col lg:flex-row gap-10 ${openSans.className} relative text-zinc-600`}>
            <RecipeContentList
              dataListItem={ingredients}
              listTitle='Ingredients'
            />
            <RecipeContentList
              dataListItem={steps}
              listTitle='Instructions'
            />
          </section>
        </div>
      </section>
    </>
  )
}
