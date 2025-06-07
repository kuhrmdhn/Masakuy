<script lang="ts" setup>
import RecipeLists from "~/components/template/RecipeLists.vue";

const route = useRoute();
const keyword = computed(() => route.query.title?.toString().trim() || "");

const { data: searchResult, refresh } = await useLazyAsyncData(
  "search-recipe-by-title",
  () => $fetch(`/api/recipe/public-recipe?title=${keyword.value}`),
  { server: false }
);

watch(keyword, () => {
  refresh();
});

useSeoMeta({
  title: computed(() => `Pencarian untuk "${keyword.value}"`),
});
</script>


<template>
  <RecipeLists :recipe-lists-data="searchResult?.data || []" />
</template>
