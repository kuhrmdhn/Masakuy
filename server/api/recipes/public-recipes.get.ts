import { firestore } from "~/server/utils/database/firebase"
import { collection, getDocs, limit, query } from "firebase/firestore"
import { responseDb } from "~/server/utils/custom_response/responseDb"

export default defineEventHandler(async (e) => {
    try {
        const { limit: limitQuery } = getQuery(e)
        const recipesCollectionRef = collection(firestore, "public_recipes")

        const queryLimit = Math.min(Number(limitQuery) || 10, 50)
        const recipesQueryDoc = query(recipesCollectionRef, limit(queryLimit))

        const recipesQuerySnapshot = await getDocs(recipesQueryDoc)
        const recipesData = recipesQuerySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        if (recipesData.length === 0) {
            setResponseStatus(e, 404)
            return responseDb(404, "No recipes found")
        }

        setResponseStatus(e, 200)
        return responseDb(200, `Success get ${recipesData.length} recipes data`, recipesData)

    } catch (err) {
        const error = err as Error
        console.error("Error fetching recipes:", error)
        setResponseStatus(e, 500)
        return responseDb(500, error.message)
    }
})
