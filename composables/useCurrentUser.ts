import { onAuthStateChanged } from "firebase/auth";
import { setToken } from "./utils/setToken";
import { useUserUIDStore } from "~/utils/store/useUserUIDStore";

export const useCurrentUser = () => {
    const { $firebaseAuth } = useNuxtApp()
    const authState = useState("auth-state", () => false)
    const authInitialized = ref(false)
    const userUIDStore = useUserUIDStore()
    const route = useRoute()
    const unProtectPage = route.path === "/login" || route.path === "/register" || route.path === "/"
    let unsubscribe: (() => void) | null = null

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
            const uid = auth.uid
            await setToken(token)

            userUIDStore.setUserUID(uid)
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