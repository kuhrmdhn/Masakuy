import { onAuthStateChanged } from "firebase/auth";
import { setToken } from "./utils/setToken";
import { useUserUIDStore } from "~/utils/store/useUserUIDStore";

export const useCurrentUser = () => {
    const { $firebaseAuth } = useNuxtApp()
    const authState = ref(false)
    const authInitialized = ref(false)
    const userUIDStore = useUserUIDStore()

    const currentUser = () => {
        onAuthStateChanged($firebaseAuth, async (auth) => {
            if (!auth) {
                authState.value = false
                authInitialized.value = true
                return null
            }
            const token = await auth.getIdToken()
            const uid = auth.uid
            await setToken(token)
            
            userUIDStore.setUserUID(uid)
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