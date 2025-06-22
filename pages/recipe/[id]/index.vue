<script lang="ts" setup>
import RecipeDescription from "~/components/elements/recipe-page/RecipeDescription.vue";
import RecipeImage from "~/components/elements/recipe-page/RecipeImage.vue";
import RecipeTitleAndAuthor from "~/components/elements/recipe-page/RecipeTitleAndAuthor.vue";
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
const recipeTitle = computed(() => recipe.value?.data.title);

useSeoMeta({
  title: recipeTitle,
});
</script>

<template>
  <div class="h-[calc(100dvh-6rem)] font-sans p-4 w-full dark:text-slate-300" v-if="recipe">
    <div class="bg-background h-full overflow-hidden w-5/6 mx-auto flex gap-7">
      <div>
        <RecipeImage :image="recipe.data.image" :title="recipe.data.title" />
      </div>
      <div class="p-6 md:p-8 w-2/3 h-full overflow-y-auto">
        <RecipeTitleAndAuthor
          :title="recipe.data.title"
          :author-id="recipe.data.authorId"
        />
        <RecipeDescription :description="recipe.data.description" />
        <ActionButtons />
        <div class="flex flex-col gap-8">
          <UtilityList
            icon="hugeicons:serving-food"
            title="Bahan-Bahan"
            :utils="recipe.data.ingredients"
          />
          <UtilityList
            icon="bi:bar-chart-steps"
            title="Waktu Persiapan"
            :utils="recipe.data.steps"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>