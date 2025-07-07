<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

useSeoMeta({
  title: `Error ${props.error?.statusCode}`,
});

const router = useRouter();
function routerBack() {
  router.back();
}

function routeToHome() {
  window.location.href = "/";
}
</script>

<template>
  <div class="w-full h-dvh flex flex-col justify-center items-center gap-10">
    <img src="./public/image/warning.png" alt="" class="w-64 lg:w-72" />
    <div class="flex flex-col gap-5 items-center">
      <h1 class="text-3xl lg:text-4xl font-bold">{{ props.error?.statusCode }}</h1>
      <p class="lg:text-lg">{{ props.error?.message }}</p>
      <div class="flex gap-3">
        <Button @click="routerBack">Kembali</Button>
        <Button @click="routeToHome" variant="outline">Ke Beranda</Button>
      </div>
    </div>
  </div>
</template>
