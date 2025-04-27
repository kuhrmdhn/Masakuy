<script setup lang="ts">
import type { Recipe } from "~/utils/zod/recipeSchema";
import RecipeCard from "../elements/recipe/RecipeCard.vue";

const props = defineProps<{
  recipeListsData: Recipe[];
}>();
</script>

<template>
    <div>
      <ul class="columns-2 md:columns-3 lg:columns-4 xl:columns-5">
        <li v-for="recipe in props.recipeListsData" :key="recipe.id">
          <RecipeCard :recipe-data="recipe" />
        </li>
      </ul>
    </div>
</template>
