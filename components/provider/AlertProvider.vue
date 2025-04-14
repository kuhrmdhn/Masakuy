<script setup lang="ts">
import { useAlertStore } from "~/store/useAlertStore";
import { Alert, AlertDescription, AlertTitle, type AlertVariants } from "../ui/alert";

const alert = useAlertStore();
const alertStyle = computed(() => {
  return alert.isShow ? "translate-x-0 right-4" : "translate-x-full";
});

watchEffect(() => {
  if (alert.isShow) {
    setTimeout(() => {
      alert.hideAlert();
    }, 10000);
  }
});
</script>

<template>
    <Alert
      :variant="alert.variant"
      :class="[
        'fixed top-2 right-0 transition-transform duration-300 ease-in-out z-50',
        alertStyle,
      ]"
    >
      <AlertTitle>{{ alert.title }}</AlertTitle>
      <AlertDescription>{{ alert.description }}</AlertDescription>
  </Alert>
</template>
