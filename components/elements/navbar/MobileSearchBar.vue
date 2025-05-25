<script lang="ts" setup>
import SearchBar from './SearchBar.vue';

const isShowSearchBar = useState("is-show-search-bar");
</script>

<template>
  <div
    :class="[
      'h-dvh w-full fixed flex justify-center duration-500 z-50',
      isShowSearchBar ? 'top-0' : '-top-full pointer-events-none',
    ]"
  >
    <div class="w-full flex justify-center pt-32 rounded-xl bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border border-white/20 shadow-lg p-4">
      <SearchBar class="w-4/5" />
    </div>
  </div>
</template>
