import { onMounted, onUnmounted } from "vue"

export const useClickOutside = (target: Ref<HTMLElement | null>, callback: () => void) => {
    const handleClick = (e: MouseEvent) => {
        const el = target.value
        if (el && !el.contains(e.target as Node)) {
            callback()
        }
    }
    const handleKeyDown = (e:KeyboardEvent) => {
        const key = e.key
        if(key === "Escape") {
            callback()
        }
    }

    onMounted(() => {
        document.addEventListener("click", handleClick)
        document.addEventListener("keydown", handleKeyDown)
    })

    onUnmounted(() => {
        document.removeEventListener("click", handleClick)
        document.removeEventListener("keydown", handleKeyDown)
    })
}
