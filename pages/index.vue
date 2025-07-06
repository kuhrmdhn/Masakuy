<script setup lang="ts">
import RecipeLists from "~/components/template/RecipeLists.vue";
import { usePublicRecipe } from "~/utils/store/usePublicRecipe";

useSeoMeta({
  title: "Beranda",
});

const publicRecipeStore = usePublicRecipe();
const { publicRecipe, fetchStatus: status } = storeToRefs(publicRecipeStore);

onMounted(async () => {
  await publicRecipeStore.initializePublicRecipe();
});
</script>

<template>
  <div>
    <RecipeLists :status :recipe-lists-data="publicRecipe" />
  </div>
</template>
