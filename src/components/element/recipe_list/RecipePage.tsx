import { RecipeDetails } from '@/types/recipeType'
import RecipeInfo from './RecipeInfo'
import { Open_Sans } from 'next/font/google'

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
    <section className='w-full lg:w-5/6 min-h-[100svh] h-max flex justify-center'>
      <div className="w-3/4 h-max flex flex-col gap-7">
        <div className='h-12 w-full flex flex-col'>
          <p className={`font-bold text-2xl ${openSans.className}`}>
            {title}
          </p>
          <p className="font-light italic">by {author}</p>
        </div>
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
          className="w-full h-[400px]"
        >
        </div>
        <div className="w-1/3">
          <RecipeInfo recipe={recipe} />
        </div>
        <div className={`w-full h-full flex ${openSans.className}`}>
          <ol className="w-full">
            <h2 className="font-bold text-3xl mb-5">Ingredients</h2>
            {
              ingredients.map((ingredient, index) => (
                <li key={index} className='flex mb-2'>
                  <span className='w-7 h-7 flex justify-center items-center rounded-full font-bold text-primary-app mr-2'>{index + 1}.</span>
                  {ingredient}
                </li>
              ))
            }
          </ol>
          <ol className="w-full">
            <h2 className="font-bold text-3xl mb-5">Instructions</h2>
            {
              steps.split("\n").map((step, index) => (
                <li key={index} className='flex mb-2 gap-5'>
                  <span className='h-7 w-7 flex justify-center items-center rounded-full font-bold text-primary-app mr-2'>{index + 1}.</span>
                  <p className="w-4/5">
                    {step}
                  </p>
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    </section>
  )
}
