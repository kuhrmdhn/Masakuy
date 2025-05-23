<script lang="ts" setup>
import { useNavbarStore } from "~/utils/store/useNavbarStore";
import AuthNav from "./AuthNav.vue";
import Logo from "./Logo.vue";
import SearchBar from "./SearchBar.vue";
import NavItem from "./NavItem.vue";
import DarkModeToggle from "../dark-mode/DarkModeToggle.vue";

const navbarStore = useNavbarStore();
const navbarShow = computed(() => navbarStore.isShow);
</script>

<template>
  <header
    v-if="navbarShow"
    class="h-20 w-full mb-1 flex px-7 justify-between items-center bg-white dark:bg-background border-b-2 sticky top-0 z-9999"
  >
    <Logo />
    <nav class="flex w-[70%] justify-between items-center">
      <NavItem url="/">
        <h1 class="underline-hover before:bg-primary hover:text-primary duration-500">Beranda</h1>
      </NavItem>
      <NavItem url="/new-recipe">
        <h1 class="underline-hover before:bg-primary hover:text-primary duration-500">Posting Resep</h1>
      </NavItem>
      <SearchBar />
      <AuthNav />
      <DarkModeToggle/>
    </nav>
  </header>
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
