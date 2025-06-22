<script lang="ts" setup>
const props = defineProps<{
  title: string;
  authorId: string;
}>();

const { data: author } = await useLazyAsyncData<{ data: string }>(
  "recipe-page-author",
  () => $fetch(`/api/recipe/author/${props.authorId}`)
);

const authorName = computed(() => author.value?.data || "Anonymous Author");
</script>

<template>
  <div class="mb-6">
    <h2 class="text-2xl md:text-3xl font-bold mb-2">{{ title }}</h2>
    <div class="flex items-center">
      <Icon name="mdi:account" class="mr-2 text-xl" />
      <span>{{ authorName}}</span>
    </div>
  </div>
</template>
