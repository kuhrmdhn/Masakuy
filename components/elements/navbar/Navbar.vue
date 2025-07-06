<script lang="ts" setup>
import { useNavbarStore } from "~/utils/store/useNavbarStore";
import AuthNav from "./AuthNav.vue";
import Logo from "./Logo.vue";
import SearchBar from "./SearchBar.vue";
import DarkModeToggle from "../dark-mode/DarkModeToggle.vue";
import PageNav from "./PageNav.vue";
import ToggleSearchBar from "./ToggleSearchBar.vue";

const navbarStore = useNavbarStore();
const navbarShow = computed(() => navbarStore.isShow);
</script>

<template>
  <header
    v-if="navbarShow"
    class="h-20 w-full mb-1 flex px-7 justify-between items-center bg-white dark:bg-background border-b-2 sticky top-0 z-9999"
  >
    <div class="w-1/5">
      <Logo />
    </div>
    <nav class="flex w-3/4 justify-end items-center gap-3">
      <div
        class="w-full py-3 flex justify-center lg:justify-end gap-5 items-center border-t-2 lg:border-none fixed bottom-0 left-0 z-10 bg-white dark:bg-background lg:relative"
      >
        <PageNav />
        <SearchBar class="hidden lg:block" />
        <ToggleSearchBar class="lg:hidden" />
        <AuthNav />
      </div>
      <DarkModeToggle />
    </nav>
  </header>
</template>
