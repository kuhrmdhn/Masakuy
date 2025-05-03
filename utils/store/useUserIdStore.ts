export const useUserIdStore = defineStore('userId', () => {
    const userId = ref<string | null>(null)
    const setUserId = (id: string) => {
        userId.value = id
    }
    const resetUserId = () => {
        userId.value = ""
    }

    return { userId, setUserId, resetUserId }
})
