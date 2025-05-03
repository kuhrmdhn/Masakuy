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

const { data, error } = useFetch<RecipeResponse>("/api/recipe/public-recipe");
const fetchErrorMessage = error.value?.statusMessage;
const fetchStatusCode = error.value?.statusCode?.toString();
const recipesData = computed(() => data.value?.data.recipesData);
</script>

<template>
  <div class="px-1">
    <Error v-if="error" :message="fetchErrorMessage" :title="fetchStatusCode" />
    <RecipeLists v-if="recipesData" :recipe-lists-data="recipesData" />
  </div>
</template>
