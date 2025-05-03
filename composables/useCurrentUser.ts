import { onAuthStateChanged } from "firebase/auth";
import { useUserIdStore } from "~/utils/store/useUserIdStore";
import { setToken } from "./utils/setToken";

export const useCurrentUser = () => {
    const { setUserId, resetUserId } = useUserIdStore()
    const { $firebaseAuth } = useNuxtApp()

    const currentUser = () => {
        onAuthStateChanged($firebaseAuth, async (auth) => {
            if (!auth) {
                resetUserId()
                return null
            }
            const token = await auth.getIdToken()
            await setToken(token)
            setUserId(auth.uid)
            return auth
        })
    }
    return { currentUser }
}