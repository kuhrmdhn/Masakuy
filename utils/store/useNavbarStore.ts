export const useNavbarStore = defineStore("navbar", () => {
    const isShow = ref<boolean>(true)
    function setIsShow(status: boolean) {
        isShow.value = status
    }
    return { isShow, setIsShow }
})