import { signOut } from "firebase/auth"
import { deleteToken } from "./utils/deleteToken"

export const useLogOut = () => {
    const logOut = async () => {
        const { $firebaseAuth } = useNuxtApp()
        deleteToken()
        await signOut($firebaseAuth)
        navigateTo("/")
    }
    return { logOut }
}