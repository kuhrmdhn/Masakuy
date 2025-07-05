<script lang="ts" setup>
const props = defineProps<{
  title: string;
  authorId: string;
}>();

const { data: author } = await useLazyAsyncData<{ data: string }>(
  `recipe-author-${props.authorId}`,
  () => $fetch(`/api/recipe/author/${props.authorId}`, { method: "GET" })
);

const authorName = computed(() => author.value?.data || "Anonymous Author");
</script>

<template>
  <div class="text-base xl:text-lg">
    <h2 class="font-bold mb-2 line-clamp-1">{{ title }}</h2>
    <div class="flex items-center text-xs">
      <Icon name="mdi:account" class="mr-2 text-sm" />
      <span>{{ authorName }}</span>
    </div>
  </div>
</template>
