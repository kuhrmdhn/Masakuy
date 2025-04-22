import { useAuth } from "~/server/utils/useAuth"

export default defineEventHandler(async (event) => {
    try {
        const { verifyToken} = useAuth(event)
        const { token } = await readBody(event)
        if (!token || token === "") {
            throw createError({
                status: 400,
                message: "Token is required"
            })
        }

        await verifyToken(token)
        setResponseHeader(
            event,
            "Set-Cookie",
            `firebase_access_token=${token};Path=/;HttpOnly;Max-Age=3600;Secure;SameSite=Strict`
        )
        setResponseStatus(event, 200)
        return { 
            success: true,
            message: "Success set token"
         }
    } catch (err) {
        const error = err as Error
        console.error(error);
        setResponseStatus(event, 500)
        return { message: error.message }
    }
})