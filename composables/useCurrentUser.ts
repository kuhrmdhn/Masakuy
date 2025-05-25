import { onAuthStateChanged } from "firebase/auth";
import { setToken } from "./utils/setToken";

export const useCurrentUser = () => {
    const { $firebaseAuth } = useNuxtApp()
    const authState = ref(false)
    const authInitialized = ref(false)

    const currentUser = () => {
        onAuthStateChanged($firebaseAuth, async (auth) => {
            try {
                if (!auth) {
                    authState.value = false
                    return null
                }
                const token = await auth.getIdToken()
                await setToken(token)
                authState.value = true
                return auth
            } catch (err) {
                console.error("Firebase auth error: ", err);
            } finally {
                authInitialized.value = true
            }
        })
    }

    onMounted(() => {
        currentUser();
    })
    return { authState, authInitialized }
}