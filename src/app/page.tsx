"use client"
import RecipeListPage from "@/components/element/recipe_list/RecipeListPage"
import { publicRecipeRouter } from "@/router/publicRecipeRouter"
import { RecipeDetails } from "@/types/recipeType"
import { Suspense, useCallback, useEffect, useState } from "react"

export default function Home() {
  const [publicRecipes, setPublicRecipes] = useState<RecipeDetails[]>([])
  const { getPublicRecipe } = publicRecipeRouter
  const fetchPublicRecipe = useCallback(async () => {
    const publicRecipes: RecipeDetails[] = await getPublicRecipe()
    setPublicRecipes(publicRecipes)
  }, [getPublicRecipe])
  useEffect(() => {
    fetchPublicRecipe()
  }, [fetchPublicRecipe])
  return (
    <div className="min-h-[100dvh] w-full overflow-y-auto">
      <Suspense fallback={<p>asd</p>}>
        <RecipeListPage recipes={publicRecipes} />
      </Suspense>
    </div>
  )
}
