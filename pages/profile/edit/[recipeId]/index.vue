<script lang="ts" setup>
import RecipeForm from "~/components/elements/new-recipe/RecipeForm.vue";
import RecipeIngredientsInput from "~/components/elements/new-recipe/RecipeIngredientsInput.vue";
import RecipeStepsInput from "~/components/elements/new-recipe/RecipeStepsInput.vue";
import { useRecipeFormData } from "~/utils/store/useRecipeFormData";
import type { Recipe } from "~/utils/zod/recipeSchema";

const route = useRoute();
const recipeId = route.params.recipeId;
const recipeFormDataStore = useRecipeFormData();

const { data: recipe, pending } = await useLazyAsyncData<{ data: Recipe }>(
  "user-recipe-by-id",
  () => $fetch(`/api/recipe/${recipeId}`),
  {
    server: false,
  }
);

const { editUserRecipe } = useEditRecipe();

watch(
  () => recipe.value?.data,
  (newData) => {
    if (newData) {
      useSeoMeta({
        title: `Edit ${newData.title || "Recipe"}`,
      });
      const ingredients = newData.ingredients.map((ingredient: string) => {
        const data = ingredient.split(" ");
        return { total: parseInt(data[0]), unit: data[1], name: data.slice(2).join(" ") };
      });
      recipeFormDataStore.setFormData({ ...newData, ingredients });
    }
  }
);

async function editRecipe() {
  await editUserRecipe();
  navigateTo("/profile");
}
</script>

<template>
  <LoadingUI v-if="pending" />
  <section v-else class="w-full min-h-[80dvh] flex justify-around pt-5">
    <RecipeForm :handle-submit="editRecipe" />
    <div class="flex relative w-3/5 overflow-hidden">
      <RecipeIngredientsInput />
      <RecipeStepsInput />
    </div>
  </section>
</template>
