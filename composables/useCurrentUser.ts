import { onAuthStateChanged } from "firebase/auth";
import { setToken } from "./utils/setToken";

export const useCurrentUser = () => {
    const { $firebaseAuth } = useNuxtApp()
    const authState = ref(false)

    const currentUser = () => {
        onAuthStateChanged($firebaseAuth, async (auth) => {
            if (!auth) {
                authState.value = false
                return null
            }
            const token = await auth.getIdToken()
            await setToken(token)
            authState.value = true
            return auth
        })
    }

    currentUser();
    return { authState }
}