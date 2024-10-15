import { Recipe } from '@/types/recipeType'
import RecipeCard from './RecipeCard'
import EmptyRecipeList from './EmptyRecipeList'

type Props = {
  recipes: Recipe[]
  isPublic?: boolean
  className?: string
}

export default function RecipeListPage({ recipes, isPublic = true, className = "grid-cols-5" }: Props) {
  return (
    <section className="w-full h-[calc(100svh-8rem)] overflow-auto">
      {
        recipes.length === 0 ? <EmptyRecipeList /> :
          <div className={`w-full h-full grid justify-items-center gap-y-5 ${className}`}>
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
