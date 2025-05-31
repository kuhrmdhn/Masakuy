<script lang="ts" setup>
import RecipeForm from "~/components/elements/new-recipe/RecipeForm.vue";
import RecipeIngredientsInput from "../../components/elements/new-recipe/RecipeIngredientsInput.vue";
import RecipeStepsInput from "~/components/elements/new-recipe/RecipeStepsInput.vue";

useSeoMeta({
  title: "New Post",
});
</script>

<template>
  <section class="w-full min-h-[80dvh] flex justify-around pt-5">
    <RecipeForm />
    <div class="flex relative w-3/5 overflow-hidden">
      <RecipeIngredientsInput />
      <RecipeStepsInput />
    </div>
  </section>
</template>
