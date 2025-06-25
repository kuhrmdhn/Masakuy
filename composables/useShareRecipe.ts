import { useAlertStore } from "~/utils/store/useAlertStore";

export const useShareRecipe = () => {
    const alertStore = useAlertStore()

    const shareRecipe = (recipeId?: string) => {
        const route = useRoute()
        const url = useRequestURL();
        const origin = url.origin
        const recipeUrl = recipeId ? `/recipe/${recipeId}` : `${route.fullPath}`
        navigator.clipboard.writeText(`${origin}${recipeUrl}`)

        alertStore.showAlert("URL disalin", "Bagikan halaman resep ini kepada dunia!", "success")
    }
    return { shareRecipe }
}