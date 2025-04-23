import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { useAlertStore } from "~/utils/store/useAlertStore";
import { authSchema } from "~/utils/zod/authSchema";

export const useAuth = () => {
    const alert = useAlertStore()
    function validateAuthInput(email: string, password: string) {
        const { error } = authSchema.safeParse({ email, password })
        if (error) {
            const errorMessages = error.errors.map((err) => err.message).join(", ")
            alert.showAlert("Registrasi gagal", errorMessages, "destructive")
            return false
        }
        return true
    }
    
    const { $firebaseAuth } = useNuxtApp()
    async function setToken(token: string) {
        try {
            await $fetch("/api/auth/set-token", {
                method: "POST",
                body: { token },
            });
        } catch (err) {
            console.error(err);
            return err
        }
    }
    
    const currentUser = () => {
        const user = useState<null | User>("user", () => null)

        onMounted(() => {
            onAuthStateChanged($firebaseAuth, async (auth) => {
                if (!auth) {
                    user.value = null
                    return
                }
                const token = await auth.getIdToken()
                await setToken(token)
                user.value = auth
                return auth
            })
        })
    }

    const signUp = async (email: string, password: string) => {
        try {
            if (!validateAuthInput(email, password)) return
            const { user } = await createUserWithEmailAndPassword($firebaseAuth, email, password)
            const token = await user.getIdToken()
            await setToken(token)
            alert.showAlert("Welcome to Masakuy!", "Your account is signed", "success")
        } catch (err) {
            const error = err as Error
            console.error(error);
        }
    }
    const signIn = async (email: string, password: string) => {
        try {
            if (!validateAuthInput(email, password)) return
            await signInWithEmailAndPassword($firebaseAuth, email, password)
            alert.showAlert("Hai!", "Selamat datang kembali!", "success")
        } catch (err) {
            const error = err as Error
            console.error(error);
            alert.showAlert("Something Wrong!", "Please Check Out Your Email and Password Again", "destructive")
        }
    }
    const logout = async () => {
        const userCookie = useCookie("firebase_access_token")
        await signOut($firebaseAuth)
        userCookie.value = null
    }

    return { currentUser, signUp, signIn, logout }
}