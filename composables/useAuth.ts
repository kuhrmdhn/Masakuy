import { useAlertStore } from "~/utils/store/useAlertStore"
import type { RegisterData, SignInData } from "~/utils/zod/authSchema"
import { validateLoginInput } from "./utils/validateLoginInput"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { validateRegisterInput } from "./utils/validateRegisterInput"
import { setToken } from "./utils/setToken"
import { createUserDoc } from "./utils/createUserDoc"
import { deleteToken } from "./utils/deleteToken"

export const useAuth = () => {
    async function logIn(signInData: SignInData) {
        const alert = useAlertStore()
        try {
            const { $firebaseAuth } = useNuxtApp()
            const { email, password } = signInData
            if (!validateLoginInput(email, password)) return

            await signInWithEmailAndPassword($firebaseAuth, email, password)
            alert.showAlert("Hai!", "Selamat datang kembali!", "success")
            refreshNuxtData()
            return await navigateTo("/")
        } catch (err) {
            const error = err as Error
            console.error(error);
            alert.showAlert(error.name, error.message, "destructive")
        }
    }

    async function register(registerData: RegisterData) {
        const alert = useAlertStore()
        try {
            const { $firebaseAuth } = useNuxtApp()
            const { email, password } = registerData

            if (!validateRegisterInput(registerData)) return
            const { user } = await createUserWithEmailAndPassword($firebaseAuth, email, password)
            const token = await user.getIdToken()
            await setToken(token)

            await createUserDoc(registerData, user.uid)
            alert.showAlert("Selamat Datang!", "Akun kamu sukses didaftarkan", "success")
            return await navigateTo("/")
        } catch (err) {
            const error = err as Error
            console.error(error);
        }
    }

    async function logOut() {
        const { $firebaseAuth } = useNuxtApp()
        deleteToken()
        await signOut($firebaseAuth)
        return await navigateTo("/")
    }

    return { logIn, register, logOut }
}