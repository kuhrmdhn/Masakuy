export default defineEventHandler(async (event) => {
    try {
        const { db } = useDb(event)
        const { verifyUserToken } = useToken(event)
    
        const { uid } = await verifyUserToken()
        const { docs: savedRecipes } = await db.collection(`users/${uid}/saved_recipe`).get()
        const savedRecipesId = savedRecipes.map((recipe) => recipe.data().id)
    
        return {
            success: true,
            message: "Success get user saved recipe id lists",
            data: savedRecipesId
        }
    } catch(err) {
        const error = err as Error
        throw createError({
            statusCode: 500,
            statusMessage: "Internal server error",
            message: error.message,
            cause: error.cause
        })
    }
})