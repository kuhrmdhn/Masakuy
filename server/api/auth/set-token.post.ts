
export default defineEventHandler(async (event) => {
    try {
        const { token } = await readBody(event)
        if (!token || token === "") {
            setResponseStatus(event, 400)
            return { message: "Token is required" }
        }

        await event.context.firebaseAdminAuth.verifyIdToken(token)
        setResponseHeader(
            event,
            "Set-Cookie",
            `firebase_access_token=${token};Path=/;HttpOnly;Max-Age=3600;Secure;SameSite=Strict`
        )
        setResponseStatus(event, 200)
        return { message: "Set token to cookie" }
    } catch (err) {
        const error = err as Error
        console.error(error);
        setResponseStatus(event, 500)
        return { message: error.message }
    }
})