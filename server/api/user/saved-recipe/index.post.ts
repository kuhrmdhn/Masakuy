export default defineEventHandler(async (event) => {
    const token = getCookie(event, "firebase_access_token")
    const { db } = useDb(event)
    const body = await readBody(event)
    const { recipeData } = body
    const { verifyToken } = useToken(event)

    if (!token) {
        throw createError({
            message: "Token is undefined",
            status: 401
        })
    }

    const { uid } = await verifyToken(token)
    const { id } = await db.collection(`users/${uid}/saved_recipe`).add(recipeData)
    console.log("add")
    return {
        success: true,
        message: `Success Saved recipe with saved id: ${id}`,
        data: recipeData
    }
})