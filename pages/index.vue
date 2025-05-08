<script setup lang="ts">
import RecipeLists from "~/components/template/RecipeLists.vue";
import { Error } from "~/components/ui/error";
import type { Recipe } from "~/utils/zod/recipeSchema";

useSeoMeta({
  title: "Beranda",
});

type RecipeResponse = {
  success: boolean;
  message: string;
  data: {
    recipesData: Recipe[];
  };
};

const userRecipes = ref<Recipe[]>([])
onMounted(async () => {
  const { data } = await $fetch<RecipeResponse>("/api/recipe/public-recipe")
  userRecipes.value = data.recipesData;
});

</script>

<template>
  <div class="px-1">
    <RecipeLists :recipe-lists-data="userRecipes"/>
  </div>
</template>
