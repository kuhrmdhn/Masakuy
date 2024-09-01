"use client"
import { Button } from "@/components/ui/button"
import { publicRecipeRouter } from "@/router/publicRecipeRouter"
import { UserRouter } from "@/router/userRouter"
import { RecipeInput } from "@/types/recipeType"
import { useCallback, useEffect } from "react"

export default function Home() {
  const { getPublicRecipe } = publicRecipeRouter
  const { createUserRecipes } = UserRouter
  const fetchPublicRecipes = useCallback(async () => {
    getPublicRecipe()
  }, [getPublicRecipe])

  useEffect(() => {
    fetchPublicRecipes()
  }, [fetchPublicRecipes])

  const uploadedRecipe: RecipeInput = {
    title: "Nasi Rames",
    ingredients: ["Nasi", "Nangka Muda"],
    steps: ["asgdjhgasd"]
  }

  return (
    <>
      <Button onClick={() => createUserRecipes(uploadedRecipe)}>Add Recipe</Button>
    </>
  )
}
