import { onAuthStateChanged } from "firebase/auth";
import { setToken } from "./utils/setToken";
import { useUserData } from "~/utils/store/useUserData";

export const useCurrentUser = () => {
    const { $firebaseAuth } = useNuxtApp()
    const authState = useState("auth-state", () => false)
    const authInitialized = ref(false)
    const route = useRoute()
    const protectedPage = route.path.startsWith("/profile") || route.path.startsWith("/new-recipe")
    let unsubscribe: (() => void) | null = null
    const userDataStore = useUserData();
    const { initializeUserData } = userDataStore;

    const currentUser = () => {
        unsubscribe = onAuthStateChanged($firebaseAuth, async (auth) => {
            if (!auth) {
                authState.value = false
                authInitialized.value = true
                if (protectedPage) {
                    return navigateTo("/login")
                }
                return null
            }
            const token = await auth.getIdToken()
            await setToken(token)
            await initializeUserData();

            authState.value = true
            authInitialized.value = true
        })
    }

    onMounted(() => {
        currentUser();
    })

    onUnmounted(() => {
        if (unsubscribe) unsubscribe()
    })

    return { authInitialized }
}