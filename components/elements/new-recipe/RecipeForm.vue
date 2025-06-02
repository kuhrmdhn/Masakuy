<script lang="ts" setup>
import { useRecipeUtilityInput } from "~/utils/store/useRecipeUtilityInput";
import RecipeImageInput from "./RecipeImageInput.vue";
import { useRecipeFormData } from "~/utils/store/useRecipeFormData";
import RecipeTextInput from "./RecipeTextInput.vue";
const recipeUtilityInputStore = useRecipeUtilityInput();

const formStore = useRecipeFormData()
const totalIngredients = computed(() => formStore.formData.ingredients.length);
const totalSteps = computed(() => formStore.formData.steps.length);

async function uploadRecipe() {
  console.log(formStore.formData);
}
</script>

<template>
  <form @submit.prevent="uploadRecipe" class="w-1/3 h-full flex flex-col gap-5">
    <RecipeImageInput />
    <RecipeTextInput/>
    <Button
      @click.prevent="recipeUtilityInputStore.showIngredientsInput"
      type="button"
      variant="ghost"
      class="w-fit text-primary"
    >
      <Icon name="radix-icons:plus" />
      Tambahkan Bahan ({{ totalIngredients }})
    </Button>
    <Button
      @click.prevent="recipeUtilityInputStore.showStepsInput"
      type="button"
      variant="ghost"
      class="w-fit text-primary"
    >
      <Icon name="radix-icons:plus" />
      Tambahkan Langkah Pembuatan ({{ totalSteps }})
    </Button>
    <Button type="submit">Ugggah</Button>
  </form>
</template>
