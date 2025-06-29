export default defineEventHandler(async (event) => {
    try {
        const { verifyUserToken } = useToken(event)
        const { db } = useDb(event)

        const { uid } = await verifyUserToken()
        const userSnap = await db.doc(`users/${uid}`).get()
        if (!userSnap.exists) {
            throw createError({
                statusCode: 404,
                statusMessage: "Not found",
                message: "User data is not found",
                cause: "User fields is not found"
            })
        }

        const data = userSnap.data() as { photo_profile?: string, username?: string }
        const { photo_profile, username } = data

        return {
            success: true,
            message: `Success get user photo profile`,
            data: { photo_profile, username }
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