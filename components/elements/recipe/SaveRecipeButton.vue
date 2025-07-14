<script lang="ts" setup>
import Button from "~/components/ui/button/Button.vue";
import { useUserSavedRecipes } from "~/utils/store/useUserSavedRecipes";
import type { Recipe } from "~/utils/zod/recipeSchema";
const props = defineProps<{
  recipe: Recipe;
  withLabel?: boolean;
}>();

const userSavedRecipeStore = useUserSavedRecipes();
const { saveRecipe, unsavedRecipe } = useSavedRecipes(props.recipe);
const savedStatus = computed(() => userSavedRecipeStore.isSavedRecipe(props.recipe.id));
const buttonData = computed(() => {
  return savedStatus.value
    ? {
        icon: "material-symbols:bookmark-rounded",
        action: unsavedRecipe,
        text: "Batal",
      }
    : {
        icon: "material-symbols:bookmark-outline-rounded",
        action: saveRecipe,
        text: "Simpan",
      };
});
</script>

<template>
  <Button
    @click.stop.prevent="buttonData.action"
    class="flex items-center text-primary hover:text-primary-dark"
    variant="ghost"
    aria-label="Save Recipe Button"
  >
    <Icon class="text-2xl" :name="buttonData.icon" />
    <span v-if="withLabel">{{ buttonData.text }}</span>
  </Button>
</template>
