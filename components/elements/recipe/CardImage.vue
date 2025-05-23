<script lang="ts" setup>
defineProps<{
    src: string,
    alt: string
}>()
</script>

<template>
    <NuxtImg :src :alt class="object-center object-cover w-1/3 sm:w-full h-full sm:h-1/2"/>
</template>
