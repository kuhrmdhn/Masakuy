import { onAuthStateChanged } from "firebase/auth";
import { setToken } from "./utils/setToken";
import { useUserData } from "~/utils/store/useUserData";

export const useCurrentUser = () => {
    const { $firebaseAuth } = useNuxtApp()
    const authState = useState("auth-state", () => false)
    const authInitialized = ref(false)
    const route = useRoute()
    const unProtectPage = route.path === "/login" || route.path === "/register" || route.path === "/" || route.path.startsWith("/recipe")
    let unsubscribe: (() => void) | null = null
    const userDataStore = useUserData();
    const { initializeUserData } = userDataStore;

    const currentUser = () => {
        unsubscribe = onAuthStateChanged($firebaseAuth, async (auth) => {
            if (!auth) {
                authState.value = false
                authInitialized.value = true
                if (!unProtectPage) {
                    return navigateTo("/login")
                }
                return null
            }
            const token = await auth.getIdToken()
            await setToken(token)
            await initializeUserData();

            authState.value = true
            authInitialized.value = true
            if (unProtectPage) {
                return navigateTo("/")
            }
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