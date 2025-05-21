<script lang="ts" setup>
import RecipeLists from "~/components/template/RecipeLists.vue";
import Loading from "~/components/ui/loading/Loading.vue";
import Error from "~/error.vue";
import type { Recipe } from "~/utils/zod/recipeSchema";
type Response = {
  data: Recipe[];
};

const { data: recipes, status, error } = await useAsyncData<Response>(
  "user-recipes-data",
  () => $fetch("/api/user/user-recipe"),
  { server: false }
);
</script>

<template>
  <Loading v-if="status === 'pending'" />
  <Error v-if="error" :error/>
  <RecipeLists v-if="recipes" :recipe-lists-data="recipes.data" />
</template>
