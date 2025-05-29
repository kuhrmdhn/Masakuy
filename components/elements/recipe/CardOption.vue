<script lang="ts" setup>
import { useUserSavedRecipes } from "~/utils/store/useUserSavedRecipes";
import type { Recipe } from "~/utils/zod/recipeSchema";

const store = useUserSavedRecipes();
const props = defineProps<{
  recipeData: Recipe;
}>();
const recipe = props.recipeData;
const { saveRecipe, unsavedRecipe } = useSavedRecipes(recipe);

const status = computed(() => store.isSavedRecipe(props.recipeData.id));
const visibleActions = computed(() => {
  return [
    { icon: "mdi:share", onClick: shareRecipe, visible: true },
    { icon: "prime:bookmark-fill", onClick: unsavedRecipe, visible: status.value },
    { icon: "prime:bookmark", onClick: saveRecipe, visible: !status.value },
  ].filter((action) => action.visible);
});

async function shareRecipe() {
  await navigator.clipboard.writeText("cek");
}
</script>

<template>
  <div class="flex sm:justify-end gap-3 h-1/3 items-center">
    <Button
      v-for="(action, index) in visibleActions"
      :key="index"
      @click.prevent="action.onClick?.()"
      class="px-1 active:scale-90"
      variant="ghost"
    >
      <Icon class="text-2xl" :name="action.icon" />
    </Button>
  </div>
</template>
