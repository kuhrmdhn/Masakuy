import { useAlertStore } from "~/utils/store/useAlertStore"
import { useRecipeFormData } from "~/utils/store/useRecipeFormData";

export const useEditRecipe = () => {
    const alertStore = useAlertStore()
    const formStore = useRecipeFormData();

    async function editUserRecipe() {
        try {
            const ingredients = formStore.formData.ingredients.map((e) => `${e.total} ${e.unit} ${e.name}`)
            const { success } = await $fetch("/api/user/user-recipe", { method: "PUT", body: { recipeData: { ...formStore.formData, ingredients } } })
            if (success) {
                alertStore.showAlert("Sukses!", "Resep telah diedit", "success")
                formStore.resetFormData()
            }
        } catch (err) {
            const error = err as Error
            console.error(error)
            alertStore.showAlert("Gagal!", error.message, "destructive")
        }
    }
    return { editUserRecipe }
}