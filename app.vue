<script setup lang="ts">
import AlertProvider from "./components/provider/AlertProvider.vue";
const { currentUser } = useAuth();

useHead({
  titleTemplate: "%s | Masakuy!",
});
useSeoMeta({
  description: "Food Recipe Website",
  ogImage: "/og-image.png",
});

currentUser()
</script>

<template>
  <NuxtPage />
  <AlertProvider />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
