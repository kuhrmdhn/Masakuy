<script lang="ts" setup>
import type { Recipe } from "~/utils/zod/recipeSchema";
import CardOption from "../recipe/CardOption.vue";

const props = defineProps<{
  recipe: Recipe;
}>();

const { data: author } = await useLazyAsyncData<{ data: string }>(
  "recipe-page-author",
  () => $fetch(`/api/recipe/author/${props.recipe.authorId}`)
);
</script>

<template>
  <div class="flex flex-col gap-3 w-1/2">
    <h1 class="text-xl font-semibold">
      {{ recipe.title }}
    </h1>
    <h2>
      {{ author?.data }}
    </h2>
    <p class="h-1/4 text-sm">
      {{ recipe.description }}
    </p>
    <CardOption class="h-fit !justify-start" :recipeData="recipe" />
  </div>
</template>
