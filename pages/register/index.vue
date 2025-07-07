<script setup>
import RegisterForm from "../../components/elements/auth/RegisterForm.vue";
import RegisterImage from "../../components/elements/auth/RegisterImage.vue";

useSeoMeta({
  title: "Daftar",
});
</script>

<template>
  <div
    class="w-full h-dvh relative lg:flex items-center lg:items-start justify-center lg:justify-center"
  >
    <section class="h-dvh w-full lg:w-1/2">
      <RegisterImage />
    </section>
    <section
      class="h-full w-full lg:w-1/2 px-4 backdrop-blur-md lg:backdrop-blur-none flex flex-col items-center justify-center absolute lg:static top-0 z-50"
    >
      <RegisterForm />
    </section>
  </div>
</template>
