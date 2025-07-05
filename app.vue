<script setup lang="ts">
import MobileSearchBar from "./components/elements/navbar/MobileSearchBar.vue";
import Navbar from "./components/elements/navbar/Navbar.vue";
import AlertProvider from "./components/provider/AlertProvider.vue";
import { useUserSavedRecipes } from "./utils/store/useUserSavedRecipes";

const { authInitialized } = useCurrentUser();
const authState = useState("auth-state");
const user = computed(() => authState.value);

const store = useUserSavedRecipes();

watchEffect(async () => {
  if (authInitialized.value && user.value) {
    const { data: recipesId } = await $fetch("/api/user/saved-recipe/id-list");
    store.setUserSavedRecipes(recipesId);
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
