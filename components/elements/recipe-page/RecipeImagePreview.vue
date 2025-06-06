<script lang="ts" setup>
defineProps<{
  src: string;
  alt: string;
}>();
</script>

<template>
  <div class="w-72 h-96 flex relative gap-3 group">
    <img class="aspect-square object-center object-cover" :src :alt />
    <slot />
  </div>
</template>
