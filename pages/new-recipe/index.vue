<script lang="ts" setup>
import RecipeForm from "~/components/elements/new-recipe/RecipeForm.vue";
import RecipeIngredientsInput from "../../components/elements/new-recipe/RecipeIngredientsInput.vue";
import RecipeStepsInput from "~/components/elements/new-recipe/RecipeStepsInput.vue";
import { useRecipeFormData } from "~/utils/store/useRecipeFormData";

const recipeFormStore = useRecipeFormData()
const { uploadUserRecipe } = useUploadNewRecipe();

onMounted(() => {
  const savedFormData = localStorage.getItem("recipe-form-data")
  if(savedFormData) {
    recipeFormStore.setFormData(JSON.parse(savedFormData))
  }
})

async function uploadRecipe() {
  await uploadUserRecipe();
}

useSeoMeta({
  title: "New Post",
});
</script>

<template>
  <section class="w-full min-h-[80dvh] flex justify-around pt-5">
    <RecipeForm :handle-submit="uploadRecipe"/>
    <div class="flex relative w-3/5 overflow-hidden">
      <RecipeIngredientsInput />
      <RecipeStepsInput />
    </div>
  </section>
</template>
