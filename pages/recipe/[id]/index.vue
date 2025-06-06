<script lang="ts" setup>
import Heading from "~/components/elements/recipe-page/Heading.vue";
import RecipeImagePreview from "~/components/elements/recipe-page/RecipeImagePreview.vue";
import UtilityList from "~/components/elements/recipe-page/UtilityList.vue";
import type { Recipe } from "~/utils/zod/recipeSchema";

const route = useRoute();
const recipeId = route.params.id;

const { data: recipe } = await useLazyAsyncData<{ data: Recipe }>(
  "recipe-by-id",
  () => $fetch(`/api/recipe/${recipeId}`),
  {
    server: false,
  }
);

const recipeTitle = computed(() => recipe.value?.data.title)

useSeoMeta({
  title: recipeTitle,
});
</script>

<template>
  <div v-if="recipe?.data" class="p-5 flex flex-col gap-5">
    <section class="flex justify-center gap-7">
      <RecipeImagePreview :src="recipe.data.image" :alt="recipe.data.title" />
      <Heading :recipe="recipe.data" />
    </section>
    <section class="flex gap-10 justify-center">
      <UtilityList class="w-1/3" title="Bahan Bahan" :utils="recipe.data.ingredients" />
      <UtilityList class="w-1/3" title="Langkah Langkah" :utils="recipe.data.steps" />
    </section>
  </div>
</template>
