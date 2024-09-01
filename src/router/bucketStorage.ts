import app from "@/lib/firebase/config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { uuid } from "uuidv4"

export const storage = getStorage(app);

export async function uploadRecipeImage(image: File) {
    try {
        const storageRef = ref(storage, `/recipe_image/${uuid()}`)
        const uploadImage = await uploadBytes(storageRef, image)
        const imageDownloadUrl = await getDownloadURL(uploadImage.ref)
        return imageDownloadUrl
    } catch (error) {
        console.error(error);
        throw error
    }
}