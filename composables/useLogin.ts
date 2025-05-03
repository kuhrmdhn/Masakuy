import { signInWithEmailAndPassword } from "firebase/auth"
import { validateLoginInput } from "./utils/validateLoginInput"
import { useAlertStore } from "~/utils/store/useAlertStore"
import type { SignInData } from "~/utils/zod/authSchema"

export const useLogin = () => {
    const signIn = async (signInData: SignInData) => {
        const alert = useAlertStore()
        try {
            const { $firebaseAuth } = useNuxtApp()
            const { email, password } = signInData

            if (!validateLoginInput(email, password)) return

            await signInWithEmailAndPassword($firebaseAuth, email, password)
            alert.showAlert("Hai!", "Selamat datang kembali!", "success")
            await navigateTo("/")
            refreshNuxtData()
        } catch (err) {
            const error = err as Error
            console.error(error);
            alert.showAlert("Ada Kesalahan!", `Silahkan cek email dan password kembali, ${error.message}`, "destructive")
        }
    }
    return { signIn }
}