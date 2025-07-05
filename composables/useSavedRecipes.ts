import { useUserSavedRecipes } from "~/utils/store/useUserSavedRecipes";
import type { Recipe } from "~/utils/zod/recipeSchema";

export const useSavedRecipes = (recipe: Recipe) => {
    const store = useUserSavedRecipes();

    async function saveRecipe() {
        const authState = useState("auth-state");
        const user = computed(() => authState.value);

        if (!user.value) return navigateTo("/login")

        await $fetch("/api/user/saved-recipe", {
            method: "POST",
            body: { recipeData: recipe },
        });
        store.addUserSavedRecipe(recipe.id);
    }

    async function unsavedRecipe() {
        await $fetch("/api/user/saved-recipe/delete", {
            method: "POST",
            body: { recipeData: recipe },
        });
        store.removeUserSavedRecipe(recipe.id);
        await refreshNuxtData("user-saved-recipe");
    }

    return { saveRecipe, unsavedRecipe }
}