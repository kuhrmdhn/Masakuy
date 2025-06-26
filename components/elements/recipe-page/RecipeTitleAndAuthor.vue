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
  <div>
    <h2 class="text-2xl md:text-base font-bold mb-2">{{ title }}</h2>
    <div class="flex items-center text-xs">
      <Icon name="mdi:account" class="mr-2 text-sm" />
      <span>{{ authorName }}</span>
    </div>
  </div>
</template>
