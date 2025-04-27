export const useUserIdStore = defineStore('userId', () => {
    const userId = ref<string | null>(null)
    const setUserId = (id: string) => {
        console.log("is set on store ", id)
        userId.value = id
    }

    return { userId, setUserId }
})
