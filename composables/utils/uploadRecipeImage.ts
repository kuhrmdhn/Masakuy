import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUserUIDStore } from "~/utils/store/useUserUIDStore";
export const uploadRecipeImage = async (file: File) => {
    try {
        const fileName = file.name
        const storageFileId = `${Date.now()}-${fileName}`
        const userUIDStore = useUserUIDStore()
        const { $firebaseStorage } = useNuxtApp()
        const recipeImageStorageRef = ref($firebaseStorage, `users/${userUIDStore.userUID}/recipe_image/${storageFileId}`)
        await uploadBytes(recipeImageStorageRef, file)
        const url = await getDownloadURL(recipeImageStorageRef)
        return { url }
    } catch (err) {
        console.error("Firebase Error: ", err);
        throw err
    }
}