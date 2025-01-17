import app from "@/lib/firebase/config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { v7 as uuidv7 } from "uuid"

export const storage = getStorage(app);

export const BucketStorage = {
    uploadRecipeImage: async (image: File) => {
        try {
            const storageRef = ref(storage, `/recipe_image/${uuidv7()}`)
            const uploadImage = await uploadBytes(storageRef, image)
            const imageDownloadUrl = await getDownloadURL(uploadImage.ref)
            return imageDownloadUrl
        } catch (error) {
            console.error(error);
            throw error
        }
    },
    uploadUserImage: async (image:File) => {
        try {
            const storageRef = ref(storage, `/user_photo/${uuidv7()}`)
            const uploadImage = await uploadBytes(storageRef, image)
            const imageDownloadUrl = await getDownloadURL(uploadImage.ref)
            return imageDownloadUrl
        } catch (error) {
            console.error(error);
            throw error
        }
    }
}