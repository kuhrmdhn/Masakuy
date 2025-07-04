import type { RouteLocationNormalized, RouteLocationNormalizedLoadedGeneric } from 'vue-router'

export const useAuthGuardPage = (
    authState: any,
    to: RouteLocationNormalized | RouteLocationNormalizedLoadedGeneric
) => {
    const protectedPage = to.path.startsWith("/profile") || to.path.startsWith("/new-recipe")
    const authPage = to.path === "/login" || to.path === "/register"

    if (authState && authPage) {
        return navigateTo("/")
    }

    if (!authState && protectedPage) {
        return navigateTo("/login")
    }

    return
}
