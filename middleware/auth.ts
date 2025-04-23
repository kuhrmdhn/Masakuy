export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie("firebase_access_token")
    if (token.value) {
        return navigateTo("/")
    }
})