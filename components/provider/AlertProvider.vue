<script setup lang="ts">
import { useAlertStore } from "~/utils/store/useAlertStore";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const alert = useAlertStore();
const alertStyle = computed(() => (alert.isShow ? "right-4" : "-right-full"));

watchEffect(() => {
  if (alert.isShow) {
    setTimeout(() => {
      alert.hideAlert();
    }, 5000);
  }
});
</script>

<template>
  <Alert
    :variant="alert.variant"
    :class="['fixed top-2 duration-300 ease-in-out z-[9999]', alertStyle]"
  >
    <AlertTitle>{{ alert.title }}</AlertTitle>
    <AlertDescription>{{ alert.description }}</AlertDescription>
    <Button
      aria-label="Close Alert Button"
      variant="ghost"
      @click="alert.hideAlert"
      class="p-2 hover:!bg-transparent hover:text-primary"
    >
      <Icon name="material-symbols:close" />
    </Button>
  </Alert>
</template>
