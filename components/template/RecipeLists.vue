<script setup lang="ts">
import type { Recipe } from "~/utils/zod/recipeSchema";
import RecipeCard from "../elements/recipe/RecipeCard.vue";
import EmptyRecipeList from "../elements/recipe/EmptyRecipeList.vue";
import LoadingUI from "../ui/loading/LoadingUI.vue";
import type { AsyncDataRequestStatus } from "#app";

defineProps<{
  recipeListsData: Recipe[];
  status?: AsyncDataRequestStatus;
  isPrivate?: boolean;
}>();
</script>

<template>
  <LoadingUI v-if="status === 'pending'" />
  <ul
    v-else-if="recipeListsData.length > 0"
    class="w-full h-auto grid gap-y-5 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:block 2xl:columns-[15.5rem] justify-items-center"
  >
    <li v-for="recipe in recipeListsData" :key="recipe.id">
      <RecipeCard :is-private :recipe-data="recipe" />
    </li>
  </ul>
  <EmptyRecipeList v-else />
</template>
