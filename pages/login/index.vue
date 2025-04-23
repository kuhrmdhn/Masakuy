<script setup>
import LoginForm from "../../components/elements/auth/LoginForm.vue";
import LoginImage from "../../components/elements/auth/LoginImage.vue";

useSeoMeta({
  title: "Masuk"
})

definePageMeta({
  middleware: "auth"
})
</script>

<template>
  <div class="w-full h-dvh relative lg:flex items-center lg:items-start justify-center lg:justify-center">
    <section class="h-full w-full lg:w-1/2">
      <LoginImage />
    </section>
    <section class="h-full w-full lg:w-1/2 px-4 backdrop-blur-md lg:backdrop-blur-none flex flex-col items-center justify-center absolute lg:static top-0 z-50">
        <LoginForm />
    </section>
  </div>
</template>
