import type { PostRecipe } from "../zod/recipeSchema"

export const useRecipeFormData = defineStore("recipe-form-data", () => {
    const formData = ref<PostRecipe>()
    function setFormData(newData: PostRecipe) {
        formData.value = newData
    }

    return { formData, setFormData }
})