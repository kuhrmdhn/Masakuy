<script lang="ts" setup>
defineProps<{
  icon: string;
  title: string;
  utils: string[];
}>();
</script>

<template>
  <div class="w-full">
    <h3 class="text-xl font-bold mb-4 flex items-center">
      <Icon :name="icon" class="text-primary mr-2" />
      {{ title }}
    </h3>
    <ul class="space-y-2">
      <li v-for="(util, index) in utils" :key="index" class="flex items-center">
        <span
          class="inline-block size-2 bg-primary rounded-full mr-3 mt-1 flex-shrink-0"
        ></span>
        <span>{{ util }}</span>
      </li>
    </ul>
  </div>
</template>
