import { useAlertStore } from "~/utils/store/useAlertStore"
import { registerSchema, type RegisterData } from "~/utils/zod/authSchema"

export function validateRegisterInput(registerData:RegisterData) {
    const alert = useAlertStore()
    const { error } = registerSchema.safeParse(registerData)
    if (error) {
        const errorMessages = error.errors.map((err) => err.message).join(", ")
        alert.showAlert("Registrasi gagal", errorMessages, "destructive")
        return false
    }
    return true
}