<script lang="ts" setup>
import type { Recipe } from "~/utils/zod/recipeSchema";
import SaveRecipeButton from "./SaveRecipeButton.vue";
import ShareRecipeButton from "./ShareRecipeButton.vue";

defineProps<{
  recipe: Recipe;
}>();
</script>

<template>
  <div class="flex sm:justify-end gap-3 h-1/3 items-center relative z-10">
    <SaveRecipeButton :recipe class="!p-0" />
    <ShareRecipeButton :recipe-id="recipe.id" class="!p-0" />
  </div>
</template>
