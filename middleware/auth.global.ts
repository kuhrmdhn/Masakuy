export default defineNuxtRouteMiddleware((to) => {
    const token = useCookie("firebase_access_token")
    const unProtectPage = to.path === "/login" || to.path === "/register" || to.path === "/" || to.path === "/search"
    if (token.value) {
        return navigateTo("/")
    }
    if(!unProtectPage) {
        return navigateTo("/login")
    }
})