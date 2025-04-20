<script setup lang="ts">
import RecipeCard from '../elements/recipe/RecipeCard.vue';
const props = defineProps<{
  recipeListsData: any;
}>();
</script>

<template>
  <ul>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <RecipeCard
        v-for="recipe in props.recipeListsData"
        :recipe-data="recipe"
      />
    </div>
  </ul>
</template>
