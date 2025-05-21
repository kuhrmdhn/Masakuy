<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div>
    <h1>{{ props.error?.statusCode }}</h1>
    <h1>{{ props.error?.message }}</h1>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>
