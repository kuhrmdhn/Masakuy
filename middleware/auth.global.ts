import { useUserData } from "~/utils/store/useUserData"

export default defineNuxtRouteMiddleware(async (to) => {
    const isServerSide = typeof window === "undefined"

    if (isServerSide) {
        const token = useCookie("firebase_access_token").value
        return useAuthGuardPage(!!token, to)
    }

    const isAuthProcessFinish = useState("auth-process-finish")
    if (!isAuthProcessFinish.value) {
        return abortNavigation()
    }

    const userDataStore = useUserData()
    const user = storeToRefs(userDataStore)

    await nextTick()
    const clientSideUserStatus = !!user.userData.value
    return useAuthGuardPage(clientSideUserStatus, to)
})
