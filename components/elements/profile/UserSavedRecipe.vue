<script lang="ts" setup>
import RecipeLists from "~/components/template/RecipeLists.vue";
import type { Recipe } from "~/utils/zod/recipeSchema";

const { data: savedRecipe } = await useAsyncData<{ data: Recipe[] }>(
  "user-saved-recipe",
  () => $fetch("/api/user/saved-recipe"),
  { server: false }
);

</script>

<template>
  <RecipeLists :recipe-lists-data="savedRecipe?.data || []" />
</template>
