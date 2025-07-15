<script lang="ts" setup>
const props = defineProps<{
  url: string;
}>();
const label = `Navigation to ${props.url} page`;
</script>

<template>
  <NuxtLink
    :href="url"
    :aria-label="label"
    class="px-3 py-2 rounded-md text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-200"
  >
    <slot />
  </NuxtLink>
</template>
