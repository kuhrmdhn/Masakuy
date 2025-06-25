<script setup lang="ts">
import type { Recipe } from "~/utils/zod/recipeSchema";
import CardBody from "./CardBody.vue";
import CardImage from "./CardImage.vue";
import CardOption from "./CardOption.vue";
import PrivateOptions from "./PrivateOptions.vue";

const props = defineProps<{
  recipeData: Recipe;
  isPrivate?: boolean;
}>();

const recipeUrl = `/recipe/${props.recipeData.id}`;
</script>

<template>
  <NuxtLink
    :href="recipeUrl"
    class="w-full md:w-56 lg:w-62 h-38 xs:h-44 sm:h-80 lg:h-84 flex sm:flex-col mb-1.5 rounded-xl overflow-hidden shadow-md bg-white dark:bg-background border border-gray-200 dark:border-gray-600"
  >
    <CardImage :src="recipeData.image" :alt="'Recipe image for ' + recipeData.title" />
    <section class="w-2/3 sm:w-full h-full sm:h-1/2 p-3 flex flex-col justify-evenly">
      <CardBody :title="recipeData.title" :authorId="recipeData.authorId" />
      <div class="flex items-center gap-3 justify-end h-12">
        <CardOption :recipe="recipeData" />
        <PrivateOptions v-if="isPrivate" :recipe-id="recipeData.id" />
      </div>
    </section>
  </NuxtLink>
</template>

<style scoped>
.text-clip-custom {
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  max-width: 18ch;
  text-overflow: ellipsis;
}
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(50%);
}
.slide-right-enter-to,
.slide-right-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
