"use client"
import React, { useCallback, useEffect, useState } from "react"
import { RecipeDetails } from "@/types/recipeType"
import { publicRecipeRouter } from "@/router/publicRecipeRouter"
import RecipeListPage from "@/components/element/recipe_list/RecipeListPage"

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
    <>
      <RecipeListPage recipes={publicRecipes} />
    </>
  )
}
