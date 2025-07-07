import { doc, setDoc } from "firebase/firestore"
import { type RegisterData } from "~/utils/zod/authSchema"
import { validateRegisterInput } from "./validateRegisterInput"
import type { User } from "~/utils/zod/userSchema"

export async function createUserDoc(userData: RegisterData, userId: string) {
    try {
        if (!validateRegisterInput(userData)) {
            throw new Error("Invalid register schema")
        }
        const { $firestore } = useNuxtApp()
        const usersRef = doc($firestore, `users/${userId}`)

        const initialUserData: User = {
            id: userId,
            bio: "Hai, saya pengguna baru!",
            name: userData.username,
            username: userData.username,
            photo_profile: ""
        }
        await setDoc(usersRef, initialUserData)
    } catch (err) {
        console.error(err)
        throw err
    }
}