export default defineNuxtRouteMiddleware(async (to) => {
    const headers = useRequestHeaders()
    const cookieHeader = headers.cookie || ""
    const cookie = cookieHeader.match(/firebase_access_token=([^;]+)/)?.[1] || null
    const protectedPage = to.path.startsWith("/profile") || to.path.startsWith("/new-recipe")
    const authPage = to.path === "/login" || to.path === "/register"

    if (cookie && authPage) {
        return navigateTo("/")
    } else if (!cookie && protectedPage) {
        return navigateTo("/login")
    }
})