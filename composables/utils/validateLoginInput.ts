import { useAlertStore } from "~/utils/store/useAlertStore"
import { signInSchema } from "~/utils/zod/authSchema"

export function validateLoginInput(email: string, password: string) {
    const alert = useAlertStore()
    const { error } = signInSchema.safeParse({ email, password })
    if (error) {
        const errorMessages = error.errors.map((err) => err.message).join(", ")
        alert.showAlert("Login gagal", errorMessages, "destructive")
        return false
    }
    return true
}