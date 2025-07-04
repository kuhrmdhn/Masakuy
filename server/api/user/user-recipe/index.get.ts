export default defineEventHandler(async (event) => {
    try {
        const { verifyUserToken } = useToken(event)
        const { db } = useFirebase(event)

        const { uid } = await verifyUserToken()
        const snapshot = await db.collection(`users/${uid}/user_recipe`).get()

        const data = snapshot.docs.map((e) => e.data())
        const userRecipeData = data
        return {
            success: true,
            message: `Success get user recipe, total ${userRecipeData.length} recipe(s)`,
            data: userRecipeData
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