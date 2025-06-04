export const useUserRecipeOptions = (recipeId: string) => {
    async function deleteRecipe(callback?: () => void) {
        await $fetch(`/api/user/user-recipe/${recipeId}`, { method: "DELETE" })
        await refreshNuxtData('user-recipes-data');
        callback?.()
    }

    return { deleteRecipe }
}