export default defineEventHandler(async (event) => {
    try {
        const { db } = useFirebase(event)
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
        const { id } = await db.collection(`users/${uid}/saved_recipe`).add(recipeData)
        return {
            success: true,
            message: `Success Saved recipe with saved id: ${id}`,
            data: recipeData
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