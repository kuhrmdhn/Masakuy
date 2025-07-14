<script lang="ts" setup>
import Button from "~/components/ui/button/Button.vue";
import { useShareRecipe } from "../../../composables/useShareRecipe";

const props = defineProps<{
  withLabel?: boolean;
  recipeId?: string;
}>();

const { shareRecipe } = useShareRecipe();
function handleShareRecipe() {
  shareRecipe(props?.recipeId);
}
</script>

<template>
  <Button
    @click.stop.prevent="handleShareRecipe"
    variant="ghost"
    class="flex items-center text-primary hover:text-primary-dark"
    aria-label="Share Recipe Button"
  >
    <Icon name="mdi:share-variant" class="mr-2 text-2xl" />
    <span v-if="withLabel">Bagikan</span>
  </Button>
</template>
