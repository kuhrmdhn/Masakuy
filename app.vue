<script setup lang="ts">
import AlertProvider from "./components/provider/AlertProvider.vue";

useSeoMeta({
  title: "Masakuy",
  description: "Food Recipe Website",
  ogImage: "/og-image.png",
  lang: "en"
});

</script>

<template>
  <NuxtPage />
  <AlertProvider />
</template>
