export default defineEventHandler(async (event) => {
    try {
        const { db } = useDb(event)
        const { authorId } = getQuery(event)

        if (!authorId) {
            console.error("Missing authorId in query");
            throw createError({
                statusCode: 400,
                statusMessage: "Missing authorId in query",
            })
        }

        const userSnap = await db.doc(`users/${authorId}`).get()

        if (!userSnap.exists) {
            console.error("User not found");
            throw createError({
                statusCode: 404,
                statusMessage: "User not found",
            })
        }

        const user = userSnap.data()
        if (!user || !user.username) {
            console.error("User data incomplete");
            throw createError({
                statusCode: 500,
                statusMessage: "User data incomplete",
            })
        }

        const username = user.username
        return {
            success: true,
            message: "Success get recipe author username",
            data: {
                username
            }
        }

    } catch (err: any) {
        console.error("[/api/get-username] Error:", err)
        throw err
    }
})
