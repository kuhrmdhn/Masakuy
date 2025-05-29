<script lang="ts" setup>
import RecipeImageInput from "./RecipeImageInput.vue";
</script>

<template>
  <form class="w-1/3 h-full flex flex-col gap-5">
    <RecipeImageInput/>
    <Input required placeholder="Nama resep" />
    <Textarea placeholder="Deskripsi resep (Opsional)" />
    <Input required type="number" min="1" placeholder="Jumlah Penyajian" />
    <Button type="button" variant="ghost" class="w-fit text-primary">
      <Icon name="radix-icons:plus" />
      Tambahkan Bahan
    </Button>
    <Button type="button" variant="ghost" class="w-fit text-primary">
      <Icon name="radix-icons:plus" />
      Tambahkan Langkah Pembuatan
    </Button>
  </form>
</template>
