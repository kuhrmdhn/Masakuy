<script setup lang="ts">
import type { Recipe } from "~/utils/zod/recipeSchema";
import RecipeCard from "../elements/recipe/RecipeCard.vue";
import EmptyRecipeList from "../elements/recipe/EmptyRecipeList.vue";

defineProps<{
  recipeListsData: Recipe[];
}>();
</script>

<template>
    <div>
      <ul v-if="recipeListsData.length > 0" class="grid grid-cols-5 justify-items-center">
        <li v-for="recipe in recipeListsData" :key="recipe.id">
          <RecipeCard :recipe-data="recipe" />
        </li>
      </ul>
      <EmptyRecipeList v-else/>
    </div>
</template>
