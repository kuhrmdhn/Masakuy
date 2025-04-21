<script setup lang="ts">
import RecipeCard from '../elements/recipe/RecipeCard.vue';
const props = defineProps<{
  recipeListsData: any;
}>();
</script>

<template>
  <ul>
    <div class="columns-[15.5rem]">
      <RecipeCard
        v-for="recipe in props.recipeListsData"
        :recipe-data="recipe"
      />
    </div>
  </ul>
</template>
