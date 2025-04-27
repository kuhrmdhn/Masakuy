<script lang="ts" setup>
import { useNavbarStore } from "~/utils/store/useNavbarStore";
import AuthNav from "./AuthNav.vue";
import Logo from "./Logo.vue";

const navbarStore = useNavbarStore();
const navbarShow = computed(() => navbarStore.isShow);
</script>


<template>
  <header
    v-if="navbarShow"
    class="h-20 w-full mb-1 flex px-7 justify-between items-center bg-white border-b-2"
  >
    <Logo />
    <AuthNav />
  </header>
</template>
