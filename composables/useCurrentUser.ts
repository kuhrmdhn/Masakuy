import { onAuthStateChanged } from "firebase/auth";
import { setToken } from "./utils/setToken";

export const useCurrentUser = () => {
    const { $firebaseAuth } = useNuxtApp()
    const authState = ref(false)
    const authInitialized = ref(false)

    const currentUser = () => {
        onAuthStateChanged($firebaseAuth, async (auth) => {
            if (!auth) {
                authState.value = false
                authInitialized.value = true
                return null
            }
            const token = await auth.getIdToken()
            await setToken(token)
            authState.value = true
            authInitialized.value = true
            return auth
        })
    }

    onMounted(() => {
        currentUser();
    })
    return { authState, authInitialized }
}