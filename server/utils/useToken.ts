import { Auth } from 'firebase-admin/auth'
import { H3Event } from 'h3'

export const useToken = (event: H3Event) => {
    const auth: Auth = event.context.firebaseAdminAuth
    const verifyToken = async (token: string) => {
        try {
            const { uid } = await auth.verifyIdToken(token)
            return { uid }

        } catch (err) {
            console.error(err);
            throw err
        }
    }
    return { auth, verifyToken }
}