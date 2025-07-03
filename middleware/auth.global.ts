export default defineNuxtRouteMiddleware(async (to) => {
    const cookie = useCookie("firebase_access_token").value
    console.log({ cookie })
    const protectedPage = to.path.startsWith("/profile") || to.path.startsWith("/new-recipe")

    if (!cookie && protectedPage) {
       return navigateTo("/login")
    }
})