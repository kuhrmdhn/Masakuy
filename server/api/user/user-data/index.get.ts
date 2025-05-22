export default defineEventHandler(async (event) => {
    try {
        const { verifyUserToken } = useToken(event)
        const { db } = useDb(event)

        const { uid } = await verifyUserToken()
        const user = await db.doc(`users/${uid}`).get()

        if (!user.exists) {
            throw createError({
                statusCode: 404,
                statusMessage: "Not found",
                message: "User data is not found",
                cause: "User fields is not found"
            })
        }

        const userData = user.data()
        return {
            success: true,
            message: "Success Get User Info",
            data: { ...userData }
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