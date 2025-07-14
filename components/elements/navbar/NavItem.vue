<script lang="ts" setup>
const props = defineProps<{
  url: string;
}>();
</script>

<template>
  <NuxtLink
    :href="props.url"
    class="px-3 py-2 rounded-md text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-200"
  >
    <slot />
  </NuxtLink>
</template>
