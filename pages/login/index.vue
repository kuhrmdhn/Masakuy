<script setup>
import LoginForm from "./LoginForm.vue";
import LoginImage from "./LoginImage.vue";
</script>

<template>
  <div class="w-full h-dvh flex">
    <section class="h-full w-1/2">
      <LoginImage />
    </section>
    <section class="h-full w-1/2 flex flex-col items-center justify-center">
        <LoginForm />
    </section>
  </div>
</template>
