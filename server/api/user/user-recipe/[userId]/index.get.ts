export default defineEventHandler(async (event) => {
    const { verifyUserAccess } = useAuth(event)
    try {
        const { db } = useDb(event)
        const params = event.context.params
        const token = getCookie(event, "firebase_access_token")
        if (!token) {
            throw createError({
                status: 401,
                message: "Please login before"
            })
        }
        if (!params) {
            throw createError({
                status: 400,
                message: "User id not define in params"
            })
        }
        const userId = params.userId
        await verifyUserAccess(token, userId)

        const snapshot = await db.collection("users").where("id", "==", userId).get()
        if (snapshot.empty) {
            throw createError({
                status: 404,
                message: "User document is not found"
            })
        }
        const data = snapshot.docs.map((e) => e.data())
        console.log({data})
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