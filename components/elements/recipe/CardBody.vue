<script lang="ts" setup>
const props = defineProps<{
  title: string;
  authorId: string;
  description?: string;
}>();

const { data } = await useAsyncData<{ success: boolean; message: string; data: string }>(
  `${props.title}-recipe-author`,
  () => $fetch(`/api/recipe/author/${props.authorId}`),
  { server: false }
);
</script>

<template>
  <div class="space-y-1 h-2/3">
    <p class="text-sm font-semibold truncate">{{ title }}</p>
    <p class="text-xs text-gray-500 dark:text-gray-400">
      oleh <span class="font-medium">{{ data?.data || "Anonim" }}</span>
    </p>
    <p class="text-sm w-full text-gray-600 dark:text-gray-300 line-clamp-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti vero facere
      voluptas! Vero, quia voluptas voluptatum a quo reiciendis praesentium dignissimos
      nulla sequi corrupti aspernatur deserunt quaerat quibusdam, incidunt autem.
    </p>
  </div>
</template>
