<script setup lang="ts">
import RecipeLists from "~/components/template/RecipeLists.vue";
import LoadingUI from "~/components/ui/loading/LoadingUI.vue";
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
  () => $fetch("/api/recipe/public-recipe"),
  {
    server: false,
  }
);

</script>

<template>
  <div class="px-1">
    <RecipeLists
      :status
      :recipe-lists-data="publicRecipes?.data || []"
    />
  </div>
</template>
