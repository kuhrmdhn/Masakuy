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
    return { auth, verifyToken }
}