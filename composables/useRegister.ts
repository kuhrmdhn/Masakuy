import type { RegisterData } from "~/utils/zod/authSchema"
import { validateRegisterInput } from "./utils/validateRegisterInput"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { setToken } from "./utils/setToken"
import { createUserDoc } from "./utils/createUserDoc"
import { useAlertStore } from "~/utils/store/useAlertStore"

export const useRegister = () => {
    async function signUp(registerData: RegisterData) {
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
    return { signUp }
}