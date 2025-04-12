<script setup>
import AlertProvider from "./components/provider/AlertProvider.vue";

const { currentUser } = useAuth();

currentUser();
</script>

<template>
  <AlertProvider />
  <NuxtPage />
</template>
