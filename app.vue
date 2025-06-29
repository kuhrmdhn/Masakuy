<script setup lang="ts">
import MobileSearchBar from "./components/elements/navbar/MobileSearchBar.vue";
import Navbar from "./components/elements/navbar/Navbar.vue";
import AlertProvider from "./components/provider/AlertProvider.vue";
import { useUserSavedRecipes } from "./utils/store/useUserSavedRecipes";
import { useUserData } from "~/utils/store/useUserData";

const { authInitialized } = useCurrentUser();
const store = useUserSavedRecipes();

watchEffect(async () => {
  if (authInitialized.value) {
    const { data: recipesId } = await $fetch("/api/user/saved-recipe/recipe-id-list");
    store.setUserSavedRecipes(recipesId);
  }
});

const userDataStore = useUserData();
const { initializeUserData } = userDataStore;

onMounted(async () => {
  await initializeUserData();
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
  <Navbar />
  <NuxtPage
    class="pb-20 lg:pb-0"
    :transition="{ name: 'page', mode: 'out-in', appear: true }"
  />
  <AlertProvider />
  <MobileSearchBar />
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
