<script setup lang="ts">
import AlertProvider from "./components/provider/AlertProvider.vue";

useSeoMeta({
  ogImage: "/og-image.png",
});
</script>

<template>
  <NuxtPage />
  <AlertProvider />
</template>
