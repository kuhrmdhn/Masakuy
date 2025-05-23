<script setup lang="ts">
import Navbar from "./components/elements/navbar/Navbar.vue";
import AlertProvider from "./components/provider/AlertProvider.vue";
import { useUserSavedRecipes } from "./utils/store/useUserSavedRecipes";
const store = useUserSavedRecipes();

const { data: recipesId, status } = await useAsyncData(
  "user-saved-recipe-id-lists",
  () => $fetch("/api/user/saved-recipe/recipe-id-list"),
  { server: false, lazy: true }
);

watchEffect(() => {
  if (status.value == "success" && recipesId.value) {
    store.setUserSavedRecipes(recipesId.value.data);
  }
});

useHead({
  titleTemplate: "%s | Masakuy!",
});
useSeoMeta({
  description: "Food Recipe Website",
  ogImage: "/og-image.png",
});
</script>

<template>
  <NuxtLayout>
    <Navbar />
    <NuxtPage :transition="{ name: 'page', mode: 'out-in', appear: true }" />
    <AlertProvider />
  </NuxtLayout>
</template>

<style>
html {
  font-family: Ubuntu;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from {
  transform: translateX(100%);
}

.page-leave-to {
  transform: translateX(-100%);
}
</style>
