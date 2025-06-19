<script lang="ts" setup></script>

<template>
  <div class="min-h-4/5 w-full flex flex-col justify-center items-center">
    <img class="h-60" src="/image/empty-recipe.png" />
    <div class="text-center">
      <h1 class="text-2xl">Resep Kosong!</h1>
      <span class="text-sm">
        <NuxtLink href="/new-recipe" class="text-primary hover:text-primary/75"
          >Buat Resep</NuxtLink
        >
        atau
        <NuxtLink href="/" class="text-primary hover:text-primary/75"
          >Cari Resep</NuxtLink
        >
      </span>
    </div>
  </div>
</template>
