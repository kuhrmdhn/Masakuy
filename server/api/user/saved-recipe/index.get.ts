export default defineEventHandler(async (event) => {
    try {
        const { verifyUserToken } = useToken(event)
        const { db } = useFirebase(event)

        const { uid } = await verifyUserToken()
        const savedRecipeSnap = await db.collection(`users/${uid}/saved_recipe`).get()

        const userSavedRecipe = savedRecipeSnap.docs.map((e) => e.data())
        return {
            success: true,
            message: "Success get user saved recipe",
            data: userSavedRecipe
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