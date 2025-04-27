import { useNavbarStore } from "~/utils/store/useNavbarStore"

export default defineNuxtRouteMiddleware((to) => {
    const {setIsShow} = useNavbarStore()
    const protectedPage = to.path === "/login" || to.path === "/register"
    if(protectedPage) {
        setIsShow(false)
    } else {
        setIsShow(true)
    }
})