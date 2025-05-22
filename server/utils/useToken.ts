import { Auth } from 'firebase-admin/auth'
import { H3Event } from 'h3'

export const useToken = (event: H3Event) => {
    const token = getCookie(event, "firebase_access_token")
    const auth: Auth = event.context.firebaseAdminAuth
    
    const verifyUserToken = async () => {
        try {
            if (!token) {
                throw createError({
                    message: "Token is undefined, maybe user not authenticated. Please sign-in or sign-up before",
                    status: 401
                })
            }
            const { uid } = await auth.verifyIdToken(token)
            return { uid }
        } catch (err) {
            console.error(err);
            throw err
        }
    }

    const verifyToken = async (token?:string) => {
        if(!token || token === "") {
            throw createError({
                message: "Token is empty or undefined, please sign-in or sign-up before",
                status: 400
            })
        }

        await auth.verifyIdToken(token)
    }
    return { auth, verifyUserToken, verifyToken }
}