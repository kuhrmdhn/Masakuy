import { addDoc, collection, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { responseDb } from "~/server/utils/custom_response/responseDb"
import { firebaseStorage, firestore } from "~/server/utils/database/firebase"

export default defineEventHandler(async (e) => {
    try {
        const formData = await readMultipartFormData(e)
        if (!formData) {
            setResponseStatus(e, 400)
            return responseDb(400, "Missing recipe data inside of form data")
        }
        const parsedData = formData.reduce((acc, item) => {
            if (!item.name) return acc
            acc[item.name] = item.filename ? item : item.data.toString();
            return acc;
        }, {} as Record<string, any>);

        const { image, authorId, ingredients, steps, title } = parsedData
        const imageFile = image.data
        const imageType = image.type

        const timestamp = Date.now()
        const imageRef = ref(firebaseStorage, `/recipe_image/${authorId}/${timestamp}`)
        const uploadImage = await uploadBytes(imageRef, imageFile, { contentType: imageType })
        const imageUrl = await getDownloadURL(uploadImage.ref)

        const recipeRef = collection(firestore, "public_recipes")
        const recipeData = {
            image: imageUrl,
            authorId,
            ingredients,
            steps,
            title
        }
        const newRecipeRef = await addDoc(recipeRef, recipeData)
        await updateDoc(newRecipeRef, { ...recipeData, id: newRecipeRef.id, image: imageUrl })

        setResponseStatus(e, 200)
        return responseDb(200, "Success upload new recipe", parsedData)
    } catch (err) {
        const error = err as Error
        setResponseStatus(e, 500)
        return responseDb(500, error.message)
    }
})