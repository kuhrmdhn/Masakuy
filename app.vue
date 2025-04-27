<script setup lang="ts">
import Navbar from "./components/elements/navbar/Navbar.vue";
import AlertProvider from "./components/provider/AlertProvider.vue";
const { currentUser } = useAuth();

useHead({
  titleTemplate: "%s | Masakuy!",
});
useSeoMeta({
  description: "Food Recipe Website",
  ogImage: "/og-image.png",
});

onMounted(() => {
  currentUser()
})
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

.page-enter-from,
.page-leave-to {
  filter: blur(3px);
}
</style>
