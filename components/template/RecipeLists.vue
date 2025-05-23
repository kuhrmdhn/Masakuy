<script setup lang="ts">
import type { Recipe } from "~/utils/zod/recipeSchema";
import RecipeCard from "../elements/recipe/RecipeCard.vue";
import EmptyRecipeList from "../elements/recipe/EmptyRecipeList.vue";
import { useUserSavedRecipes } from "~/utils/store/useUserSavedRecipes";
const savedRecipeStore = useUserSavedRecipes();

defineProps<{
  recipeListsData: Recipe[];
}>();
</script>

<template>
  <div v-if="!savedRecipeStore.isFetched">
    loading...
  </div>
  <ul
    v-else-if="recipeListsData.length > 0"
    class="w-full h-auto grid gap-y-5 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:block 2xl:columns-[15.5rem] justify-items-center px-3"
  >
    <li v-for="recipe in recipeListsData" :key="recipe.id">
      <RecipeCard :recipe-data="recipe" />
    </li>
  </ul>
  <EmptyRecipeList v-else />
</template>
