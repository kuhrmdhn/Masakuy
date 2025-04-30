import { Auth } from 'firebase-admin/auth'
import { H3Event } from 'h3'

export const useAuth = (event: H3Event) => {
    const auth: Auth = event.context.firebaseAdminAuth
    const verifyToken = async (token: string) => {
        try {
            await auth.verifyIdToken(token)
        } catch (err) {
            console.error(err);
        }
    }
    const verifyUserAccess = async (token: string, userId: string) => {
        try {
            const { uid } = await auth.verifyIdToken(token)
            if(uid !== userId) {
                throw createError({
                    status: 403,
                    message: "User not have access"
                })
            }

        } catch (err) {
            console.error(err);
            throw err
        }
    }
    return { auth, verifyToken, verifyUserAccess }
}