import type { UploadRecipeForm } from "../zod/recipeSchema"

export const useRecipeFormData = defineStore("recipe-form-data", () => {
    const formData = ref<UploadRecipeForm>()
    function setFormData(newData: UploadRecipeForm) {
        formData.value = newData
    }

    return { formData, setFormData }
})