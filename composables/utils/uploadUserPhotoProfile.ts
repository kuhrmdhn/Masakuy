import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUserUIDStore } from "~/utils/store/useUserUIDStore";
export const uploadUserPhotoProfile = async (file: File) => {
    try {
        const fileName = file.name
        const storageFileId = `${Date.now()}-${fileName}`
        const userUIDStore = useUserUIDStore()
        const { $firebaseStorage } = useNuxtApp()
        const recipeImageStorageRef = ref($firebaseStorage, `users/${userUIDStore.userUID}/photo-profile/${storageFileId}`)
        await uploadBytes(recipeImageStorageRef, file)
        const url = await getDownloadURL(recipeImageStorageRef)
        return { url }
    } catch (err) {
        console.error("Firebase Error: ", err);
        throw err
    }
}