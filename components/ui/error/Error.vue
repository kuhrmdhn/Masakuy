<script lang="ts" setup>

const props = defineProps<{
  title?: string;
  message?: string;
}>();
</script>

<template>
  <div
    class="fixed z-9999 top-0 left-0 h-dvh w-full bg-white flex flex-col justify-center items-center"
  >
    <img class="size-56" src="/image/logo.png" />
    <div class="flex flex-col items-center">
      <h1 class="font-bold text-3xl">{{ props.title || "Oops..." }}</h1>
      <p class="font-light text-lg">{{ props.message || "Ada kesalahan!" }}</p>
    </div>
  </div>
</template>
