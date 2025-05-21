export default defineEventHandler(async (event) => {
    try {
        const { verifyToken } = useToken(event)
        const { db } = useDb(event)
        const token = getCookie(event, "firebase_access_token")

        if (!token) {
            throw createError({
                status: 401,
                message: "Please login before"
            })
        }
        const { uid } = await verifyToken(token)

        const snapshot = await db.collection(`users/${uid}/user_recipe`).get()
        if (snapshot.empty) {
            throw createError({
                status: 404,
                message: "User document is not found"
            })
        }
        const data = snapshot.docs.map((e) => e.data())
        if (!data) {
            throw createError({
                status: 404,
                message: "User document is not found"
            })
        }
        const userRecipeData = data
        return {
            success: true,
            message: `Success get user recipe, total ${userRecipeData.length} recipe(s)`,
            data: userRecipeData
        }
    } catch (err) {
        console.error(err);
        throw err
    }
})