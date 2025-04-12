import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAlertStore } from "~/store/useAlertStore";

export const useAuth = () => {
    // utils
    const alert = useAlertStore()
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
    //compose
    const currentUser = () => {
        let unsubscribe: null | (() => void) = null
        onMounted(() => {
            unsubscribe = onAuthStateChanged($firebaseAuth, async (auth) => {
                if (!auth) {
                    console.warn("Auth state is null, your access is limited to access some feature. Please login or register your account");
                    return
                }
                const token = await auth.getIdToken()
                await setToken(token)
            })
        })
        onUnmounted(() => {
            if (unsubscribe) unsubscribe()
        })
    }
    const signUp = async (email: string, password: string) => {
        try {
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
            await signInWithEmailAndPassword($firebaseAuth, email, password)
            alert.showAlert("Hi!", "Welcome Back to Masakuy", "success")
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