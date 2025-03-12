import { doc, getDoc } from "firebase/firestore"
import { firestore } from "~/server/utils/database/firebase"
import { responseDb } from "~/server/utils/custom_response/responseDb"

export default defineEventHandler(async (e) => {
    try {
        const recipeId = getRouterParam(e, "id")
        if (!recipeId) {
            setResponseStatus(e, 400)
            return responseDb(400, "Recipe id is required")
        }
        const recipeDocRef = doc(firestore, `public_recipes/${recipeId}`)
        const recipeData = await getDoc(recipeDocRef)
        if (!recipeData.exists()) {
            setResponseStatus(e, 404)
            return responseDb(404, `Recipe for ${recipeId} is not found`)
        }

        setResponseStatus(e, 200)
        return responseDb(200, `Success Get Recipe Data for Recipe Id: ${recipeId}`, recipeData.data())
    } catch (err) {
        const error = err as Error
        console.error("Error fetching recipe:", error)
        setResponseStatus(e, 500)
        return responseDb(500, error.message)
    }
})