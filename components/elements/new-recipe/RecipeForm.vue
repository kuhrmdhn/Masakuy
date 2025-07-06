<script lang="ts" setup>
import { useRecipeUtilityInput } from "~/utils/store/useRecipeUtilityInput";
import RecipeImageInput from "./RecipeImageInput.vue";
import { useRecipeFormData } from "~/utils/store/useRecipeFormData";
import RecipeTextInput from "./RecipeTextInput.vue";
import MobileRecipeUtilityInput from "./MobileRecipeUtilityInput.vue";
import RecipeIngredientsInput from "./RecipeIngredientsInput.vue";
import RecipeStepsInput from "./RecipeStepsInput.vue";

defineProps<{
  handleSubmit: () => void;
}>();

const recipeUtilityInputStore = useRecipeUtilityInput();
const formStore = useRecipeFormData();
const totalIngredients = computed(() => formStore.formData.ingredients.length);
const totalSteps = computed(() => formStore.formData.steps.length);
</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-full xl:w-1/3 h-full flex flex-col gap-5">
    <RecipeImageInput />
    <RecipeTextInput />
    <div class="hidden xl:flex flex-col gap-5">
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
    </div>
    <div class="flex xl:hidden flex-col gap-5">
      <MobileRecipeUtilityInput :title="`Tambahkan Bahan (${totalIngredients})`">
        <RecipeIngredientsInput class="relative right-0" />
      </MobileRecipeUtilityInput>
      <MobileRecipeUtilityInput :title="`Tambahkan Langkah Pembuatan (${totalSteps})`">
        <RecipeStepsInput class="relative" />
      </MobileRecipeUtilityInput>
    </div>
    <Button type="submit">Ugggah</Button>
  </form>
</template>
