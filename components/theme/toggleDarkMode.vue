<script lang="ts">
const colorMode = useColorMode()
const toggleTheme = computed({
    set() {
        return colorMode.value === "dark"
    },
    get() {
        return colorMode.preference === "dark" ? "light" : "dark"
    }
})
</script>

<template>
    <div>
        <UButton>
            
        </UButton>
    </div>
</template>