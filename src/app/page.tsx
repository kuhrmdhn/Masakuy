"use client"
import RecipePageSkeleton from "@/components/element/loading/RecipePageSkeleton";
import { publicRecipeRouter } from "@/router/publicRecipeRouter"
import { RecipeDetails } from "@/types/recipeType"
import { lazy, Suspense, useCallback, useEffect, useState } from "react"

const RecipeListPage = lazy(() => import("@/components/element/recipe_list/RecipeListPage"));
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
      <Suspense fallback={<RecipePageSkeleton />}>
        <RecipeListPage recipes={publicRecipes} />
      </Suspense>
    </div>
  )
}
