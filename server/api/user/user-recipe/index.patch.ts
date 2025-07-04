export default defineEventHandler(async (event) => {
    try {
        const { verifyUserToken } = useToken(event)
        const { db } = useFirebase(event)

        const { uid } = await verifyUserToken()
        const { recipeData } = await readBody(event)

        const recipeDocRef = db.collection(`users/${uid}/user_recipe`).doc(recipeData.id)
        if (!recipeDocRef) {
            throw createError({
                message: "Recipe document is empty",
                statusCode: 400,
                statusMessage: "Bad request",
                cause: "Invalid upload data schema"
            })
        }
        await recipeDocRef.update({ ...recipeData })
        await db.collection('public_recipes').doc(recipeData.id).set({ ...recipeData });
        return {
            success: true,
            message: `Success edit user recipe`,
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