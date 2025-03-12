import { doc, getDoc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { responseDb } from "~/server/utils/custom_response/responseDb"
import { firebaseStorage, firestore } from "~/server/utils/database/firebase"

export default defineEventHandler(async (e) => {
    const formData = await readMultipartFormData(e)
    if (!formData) {
        return
    }

    const userData = formData.reduce((acc, item) => {
        if (!item.name) return acc
        acc[item.name] = item.filename ? item : item.data.toString();
        return acc;
    }, {} as Record<string, any>)

    try {
        const { userId, image } = userData
        if (image) {
            const imageType = image.type
            const imageFile = image.data
            const newImageUrl = await uploadUserPhotoProfile(userId, imageFile, imageType)
            await changeUserProfile(userId, { photo_profile: newImageUrl })
            setResponseStatus(e, 200)
            return responseDb(200, "Updated user photo profile")
        }
    
        await changeUserProfile(userId, userData)
        setResponseStatus(e, 200)
        return responseDb(200, "Updated user photo profile")
    } catch (err) {
        const error = err as Error
        setResponseStatus(e, 500)
        return responseDb(500, error.message)
    }
})

async function changeUserProfile(userId: string, data: any) {
    const userDocRef = doc(firestore, "users", userId)
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
        await updateDoc(userDocRef, data);
    } else {
        console.error("User not found!");
    }
}

async function uploadUserPhotoProfile(userId: string, imageFile: File, imageType: string) {
    const timestamp = Date.now()
    const userPhotoProfileRef = ref(firebaseStorage, `user_photo/${userId}/${timestamp}`)
    const uploadImage = await uploadBytes(userPhotoProfileRef, imageFile, { contentType: imageType })
    const imageUrl = await getDownloadURL(uploadImage.ref)
    console.log(imageUrl)
    return imageUrl
}