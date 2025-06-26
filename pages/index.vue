<script setup lang="ts">
import RecipeLists from "~/components/template/RecipeLists.vue";
import type { Recipe } from "~/utils/zod/recipeSchema";

useSeoMeta({
  title: "Beranda",
});

type RecipeResponse = {
  success: boolean;
  message: string;
  data: Recipe[];
};

const { data: publicRecipes, status } = useAsyncData<RecipeResponse>(
  "public-recipes",
  () => $fetch("/api/recipe/public-recipe", { method: "GET" }),
  {
    server: false,
  }
);

const publicRecipesData = computed(() => publicRecipes.value?.data || []);
</script>

<template>
  <div class="px-1">
    <RecipeLists :status :recipe-lists-data="publicRecipesData" />
  </div>
</template>
