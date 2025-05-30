<script lang="ts" setup>
const keyword = ref("");

function searchRecipe() {
  console.log(keyword);
}
</script>

<template>
  <form
    @submit.prevent="searchRecipe"
    class="h-12 w-1/2 flex justify-center items-center relative duration-300"
  >
    <Input
      class="w-full h-full pr-18"
      v-model="keyword"
      placeholder="Cari resep untuk hari ini"
    />
    <Button type="submit" class="w-16 h-full absolute right-0 top-0">
      <Icon name="ic:twotone-search" class="text-2xl" />
    </Button>
  </form>
</template>
