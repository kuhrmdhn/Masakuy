export default defineEventHandler(async (event) => {
    try {
        const param = event.context.params
        if (!param) {
            throw createError({
                statusCode: 400,
                statusMessage: "Bad request",
                cause: "Undefined Params"
            })
        }

        const id = param.id
        const token = getCookie(event, "firebase_access_token")
        const { verifyToken } = useToken(event)
        await verifyToken(token)
        
        const { db } = useDb(event)
        const recipeData = await db.doc(`public_recipes/${id}`).get()

        return {
            success: true,
            message: `Success get recipe data with id: ${id}`,
            data: recipeData.data()
        }
    } catch (err) {
        console.error(err);
    }
})