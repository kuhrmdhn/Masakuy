<script lang="ts" setup>
import RecipeLists from "~/components/template/RecipeLists.vue";
import type { Recipe } from "~/utils/zod/recipeSchema";

useSeoMeta({ title: "Profile" });
const userRecipes = ref<Recipe[]>([])
onMounted(async () => {
  const { data } = await $fetch("/api/user/user-recipe", { credentials: "include" })
  userRecipes.value = data.userRecipeData as Recipe[];
});

</script>

<template>
  <div class="px-1">
    <RecipeLists :recipe-lists-data="userRecipes"/>
  </div>
</template>
