import type { AsyncDataRequestStatus } from "#app"
import type { Recipe } from "../zod/recipeSchema"

export const usePublicRecipe = defineStore("public-recipe", () => {
    const fetchStatus = ref<AsyncDataRequestStatus>("idle")
    const publicRecipe = ref<Recipe[]>([])
    function setPublicRecipe(publicRecipeData: Recipe[]) {
        publicRecipe.value = publicRecipeData
    }
    async function initializePublicRecipe() {
        try {
            fetchStatus.value = "pending"
            if (publicRecipe.value.length <= 0) {
                const { data } = await $fetch("/api/recipe/public-recipe", { method: "GET" })
                publicRecipe.value = data
            }

        } finally {
            fetchStatus.value = "idle"
        }
    }

    return { publicRecipe, fetchStatus, setPublicRecipe, initializePublicRecipe }
})