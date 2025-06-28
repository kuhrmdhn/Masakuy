import type { User } from "../zod/userSchema"

export const useUserData = defineStore("user-data", () => {
    const userData = ref<User | null>(null)
    const setUserData = (data: User) => {
        return userData.value = data
    }
    const initializeUserData = async () => {
        const { data } = await $fetch<{data: User}>("/api/user/user-data")
        if (data) {
            return userData.value = data;
        }
    };

    return { userData, setUserData, initializeUserData }
})