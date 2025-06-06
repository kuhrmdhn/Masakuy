import type { Recipe } from "~/utils/zod/recipeSchema"

export const useGetRecipeById = (recipeId: string) => {
    async function getRecipe() {
        const response = await $fetch(`/api/recipe/${recipeId}`)
        const data = response?.data
        return data
    }

    return { getRecipe }
}