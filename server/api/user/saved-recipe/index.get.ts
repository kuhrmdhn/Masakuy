export default defineEventHandler(async (event) => {
    const token = getCookie(event, "firebase_access_token")
    const { verifyToken } = useToken(event)
    const {db} = useDb(event)
    if (!token) {
        throw createError({
            message: "Token is undefined",
            status: 401
        })
    }
    const { uid } = await verifyToken(token)
    const savedRecipeSnap = await db.collection(`users/${uid}/saved_recipe`).get()
    const userSavedRecipe = savedRecipeSnap.docs.map((e) => e.data())
    return {
        success: true,
        message: "Success get user saved recipe",
        data: userSavedRecipe
    }
})