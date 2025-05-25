<script lang="ts" setup>
import RecipeLists from "~/components/template/RecipeLists.vue";
import type { Recipe } from "~/utils/zod/recipeSchema";

const { data: recipes, status } = await useLazyAsyncData<{ data: Recipe[] }>(
  "user-recipes-data",
  () => $fetch("/api/user/user-recipe"),
  { server: false }
);
</script>

<template>
  <RecipeLists v-if="recipes" :recipe-lists-data="recipes.data" :status />
</template> 
