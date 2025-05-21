export default defineEventHandler(async (event) => {
    const token = getCookie(event, "firebase_access_token")
    if (!token) {
        throw createError({
            status: 400,
            message: "Token is undefined"
        })
    }
    const { verifyToken } = useToken(event)
    const { db } = useDb(event)
    const { uid } = await verifyToken(token)
    const user = await db.doc(`users/${uid}`).get()
    if (!user.exists) {
        throw createError({
            status: 404,
            message: "User data is not found"
        })
    }
    const userData = user.data()

    setResponseStatus(event, 200)
    return {
        success: true,
        message: "Success Get User Info",
        data: { ...userData }
    }
})