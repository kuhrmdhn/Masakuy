<script lang="ts" setup>
defineProps<{
  title: string;
  utils: string[];
}>();
</script>

<template>
  <ul class="w-2/5">
    <h1 class="text-lg font-semibold mb-5">{{ title }}:</h1>
    <li v-for="(util, index) of utils" class="flex gap-3 mb-2">
      <h1 class="font-bold">{{ index + 1 }}.</h1>
      <p>
        {{ util }}
      </p>
    </li>
  </ul>
</template>
