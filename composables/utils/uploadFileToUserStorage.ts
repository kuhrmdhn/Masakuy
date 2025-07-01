import { getDownloadURL, uploadBytes, ref } from "firebase/storage"
import { useUserData } from "~/utils/store/useUserData"

export const uploadFileToUserStorage = async (file: File, path: string) => {
    try {
        const userDataStore = useUserData()
        const { userData } = storeToRefs(userDataStore)
        
        const fileName = file.name
        const storageFileId = `${Date.now()}-${fileName}`
        const { $firebaseStorage } = useNuxtApp()
        const recipeImageStorageRef = ref($firebaseStorage, `users/${userData.value?.id}/${path}/${storageFileId}`)
        
        await uploadBytes(recipeImageStorageRef, file)
        const url = await getDownloadURL(recipeImageStorageRef)
        return { url }
    } catch (err) {
        console.error("Firebase Error: ", err);
        throw err
    }
}