<script setup lang="ts">
import RecipeLists from "~/components/template/RecipeLists.vue";

const { getPublicRecipes } = useRecipe();
const publicRecipe = await getPublicRecipes();
</script>

<template>
  <div>
    <RecipeLists :recipe-lists-data="publicRecipe" />
  </div>
</template>
