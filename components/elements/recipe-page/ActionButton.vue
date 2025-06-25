<script lang="ts" setup>
import type { Recipe } from "~/utils/zod/recipeSchema";
import SaveRecipeButton from "../recipe/SaveRecipeButton.vue";
import ShareRecipeButton from "../recipe/ShareRecipeButton.vue";

defineProps<{
  recipe: Recipe;
}>();
</script>

<template>
  <div class="flex justify-start items-center mb-8 gap-4 w-1/2">
    <SaveRecipeButton class="!w-1/2" :with-label="true" :recipe />
    <ShareRecipeButton class="!w-1/2" :with-label="true" />
  </div>
</template>
