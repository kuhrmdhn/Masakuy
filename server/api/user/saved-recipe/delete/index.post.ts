export default defineEventHandler(async(event) => {
    try {
        const { db } = useDb(event)
        const { verifyUserToken } = useToken(event)
        const { recipeData } = await readBody(event)

        if (!recipeData) {
            throw createError({
                statusCode: 400,
                statusMessage: "Recipe data is undefined",
                message: "Recipe data is required, but receive is undefined. Please define recipe data before",
                cause: "Recipe data not found",
            })
        }

        const { uid } = await verifyUserToken()
        const snap = await  db.collection(`users/${uid}/saved_recipe`).where("id", "==", recipeData.id).get()
        await snap.docs[0].ref.delete()
        return {
            success: true,
            message: `Success unsaved recipe with recipe id: ${recipeData.id}`,
        }
    } catch (err) {
        const { message, cause } = err as Error
        throw createError({
            statusCode: 500,
            statusMessage: "Internal server error",
            message,
            cause
        })
    }
})