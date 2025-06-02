import { useAlertStore } from "~/utils/store/useAlertStore"
import { useRecipeFormData } from "~/utils/store/useRecipeFormData";

export const useUploadNewRecipe = () => {
    const alertStore = useAlertStore()
    const formStore = useRecipeFormData();

    async function uploadUserRecipe() {
        try {
            const ingredients = formStore.formData.ingredients.map((e) => `${e.total} ${e.unit} ${e.name}`)
            const { success } = await $fetch("/api/user/user-recipe", { method: "POST", body: { recipeData: { ...formStore.formData, ingredients } } })
            if (success) {
                alertStore.showAlert("Sukses!", "Resep baru telah ditambahkan", "success")
                formStore.resetFormData()
            }
        } catch (err) {
            const error = err as Error
            console.error(error)
            alertStore.showAlert("Gagal!", error.message, "destructive")
        }
    }
    return { uploadUserRecipe }
}