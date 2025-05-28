export const useUserUIDStore = defineStore("user-uid", () => {
    const userUID = ref("")
    function setUserUID(uid: string) {
        userUID.value = uid
    }

    return { userUID, setUserUID }
})