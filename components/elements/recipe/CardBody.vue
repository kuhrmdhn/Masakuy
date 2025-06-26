<script lang="ts" setup>
import RecipeDescription from "../recipe-page/RecipeDescription.vue";
import RecipeTitleAndAuthor from "../recipe-page/RecipeTitleAndAuthor.vue";

const props = defineProps<{
  title: string;
  authorId: string;
  description?: string;
}>();
</script>

<template>
  <div class="space-y-1 h-2/3">
    <RecipeTitleAndAuthor :title :authorId />
    <RecipeDescription :description class="line-clamp-2 text-sm" />
  </div>
</template>
