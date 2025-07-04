import { useToken } from "~/server/utils/useToken"

export default defineEventHandler(async (event) => {
    try {
        const { verifyToken } = useToken(event)
        const { token } = await readBody(event)

        await verifyToken(token)
        setResponseHeader(
            event,
            "Set-Cookie",
            `firebase_access_token=${token};Path=/;HttpOnly;Max-Age=3600;Secure;SameSite=Strict`
        )
        return {
            success: true,
            message: "Success set user access token"
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