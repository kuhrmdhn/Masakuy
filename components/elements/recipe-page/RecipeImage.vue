<script setup lang="ts">
    defineProps<{
        image: string;
        title: string;
    }>()
</script> 

<template>
  <div class="h-64 md:h-80 overflow-hidden rounded-xl">
    <img :src="image" :alt="title" class="w-full h-full object-cover" />
  </div>
</template>
