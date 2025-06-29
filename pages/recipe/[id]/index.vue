<script lang="ts" setup>
import RecipeDescription from "~/components/elements/recipe-page/RecipeDescription.vue";
import RecipeImage from "~/components/elements/recipe-page/RecipeImage.vue";
import RecipeTitleAndAuthor from "~/components/elements/recipe-page/RecipeTitleAndAuthor.vue";
import UtilityList from "~/components/elements/recipe-page/UtilityList.vue";
import ActionButton from "~/components/elements/recipe-page/ActionButton.vue";
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
const recipeData = computed(() => recipe.value?.data);

useSeoMeta({
  title: recipeData.value?.title || "Recipe Page",
  ogImage: recipeData.value?.image,
});
</script>

<template>
  <div
    class="h-auto xl:h-[calc(100dvh-6rem)] font-sans p-4 w-full dark:text-slate-300"
    v-if="recipeData"
  >
    <div
      class="bg-background h-full overflow-hidden sm:w-3/5 xl:w-5/6 mx-auto flex flex-col xl:flex-row gap-7"
    >
      <div class="lg:w-2/5">
        <RecipeImage :image="recipeData.image" :title="recipeData.title" />
      </div>
      <div class="p-6 md:p-8 w-full lg:w-2/3 h-full xl:overflow-y-auto">
        <RecipeTitleAndAuthor
          :title="recipeData.title"
          :author-id="recipeData.authorId"
        />
        <RecipeDescription :description="recipeData.description" />
        <ActionButton :recipe="recipeData" />
        <div class="flex flex-col gap-8 w-full">
          <UtilityList
            icon="hugeicons:serving-food"
            title="Bahan-Bahan"
            :utils="recipeData.ingredients"
          />
          <UtilityList
            icon="bi:bar-chart-steps"
            title="Langkah Pembuatan"
            :utils="recipeData.steps"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (width >= 80rem) {
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-dark);
  }

  @supports (scrollbar-color: auto) {
    * {
      scrollbar-color: var(--primary) transparent;
      scrollbar-width: thin;
    }
  }
}
</style>
