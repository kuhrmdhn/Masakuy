<script setup lang="ts">
import MobileSearchBar from "./components/elements/navbar/MobileSearchBar.vue";
import Navbar from "./components/elements/navbar/Navbar.vue";
import AlertProvider from "./components/provider/AlertProvider.vue";
import { useUserSavedRecipes } from "./utils/store/useUserSavedRecipes";

const { authInitialized } = useCurrentUser();
const store = useUserSavedRecipes();

watchEffect(
  async () => {
    if (authInitialized.value) {
      const { data: recipesId } = await useAsyncData(
        "user-saved-recipe-id-lists",
        () => $fetch("/api/user/saved-recipe/recipe-id-list"),
        { server: false, lazy: true }
      );
      store.setUserSavedRecipes(recipesId.value?.data || []);
    }
  },
  { flush: "post" }
);

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
    <NuxtPage
      class="pb-20 lg:pb-0"
      :transition="{ name: 'page', mode: 'out-in', appear: true }"
    />
    <AlertProvider />
    <MobileSearchBar />
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
