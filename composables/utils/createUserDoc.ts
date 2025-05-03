import { doc, setDoc } from "firebase/firestore"
import { type RegisterData } from "~/utils/zod/authSchema"
import { validateRegisterInput } from "./validateRegisterInput"

export async function createUserDoc(userData: RegisterData, userId: string) {
    try {
        if (!validateRegisterInput(userData)) {
            throw new Error("Invalid register schema")
        }
        const { $firestore } = useNuxtApp()
        const usersRef = doc($firestore, `users/${userId}`)

        const { email, username } = userData
        await setDoc(usersRef, { id: userId, email, username })
    } catch (err) {
        console.error(err)
        throw err
    }
}