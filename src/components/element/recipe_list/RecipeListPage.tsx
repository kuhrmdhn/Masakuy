import { Recipe } from '@/types/recipeType'
import RecipeCard from './RecipeCard'
import EmptyRecipeList from './EmptyRecipeList'

type Props = {
  recipes: Recipe[]
  isPublic?: boolean
  className?: string
}

export default function RecipeListPage({ recipes, isPublic = true, className }: Props) {
  return (
    <section className="w-full h-full overflow-hidden sm:pl-40 lg:pl-52">
      {
        recipes.length === 0 ? <EmptyRecipeList /> :
          <div className={`w-full h-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-items-center gap-y-3 ${className}`}>
            {
              recipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
                  index={index}
                  recipe={recipe}
                  isPublic={isPublic}
                />
              ))
            }
          </div>
      }
    </section>
  )
}
