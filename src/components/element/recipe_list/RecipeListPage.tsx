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
    <section className="w-full h-full overflow-hidden">
      {
        recipes.length === 0 ? <EmptyRecipeList /> :
          <div className={`w-full h-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 justify-items-center place-content-start gap-y-5 ${className}`}>
            {
              recipes.map((recipe, index) => (
                <RecipeCard
                  key={index}
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
