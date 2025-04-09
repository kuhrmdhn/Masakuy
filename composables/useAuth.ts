
export const useAuth = () => {
    const { $firebaseAuth } = useNuxtApp()
    const currentUser = async () => {
        const user = $firebaseAuth.currentUser
        console.log({ user })
    }

    return { currentUser }
}