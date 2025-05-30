<script lang="ts" setup>
import NavItem from "./NavItem.vue";

const pageNavList = [
  {
    id: 1,
    text: "Beranda",
    url: "/",
    icon: "radix-icons:home",
  },
  {
    id: 2,
    text: "Posting Resep",
    url: "/new-recipe",
    icon: "radix-icons:plus",
  },
];
</script>

<template>
  <NavItem :title="nav.text" v-for="nav in pageNavList" :url="nav.url" class="flex justify-center items-center">
    <h1
      class="underline-hover hidden lg:block before:bg-primary hover:text-primary duration-500"
    >
      {{ nav.text }}
    </h1>
      <Icon :name="nav.icon" class="text-xl" />
  </NavItem>
</template>

<style scoped>
.underline-hover {
  position: relative;
  width: fit-content;
}
.underline-hover::before {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  height: 2px;
  width: 0;
  transition-duration: 500ms;
}
.underline-hover:hover::before {
  width: 50%;
}
</style>
