<script setup lang="ts">
const colorMode = useColorMode();
const toggleList = [
  {
    id: 1,
    preference: "dark",
    class: "dark:hidden block",
    icon: "radix-icons:moon",
  },
  {
    id: 2,
    preference: "light",
    class: "dark:block hidden",
    icon: "radix-icons:sun",
  },
];
</script>

<template>
  <Button
    v-for="toggle in toggleList"
    aria-label="Toggle Dark Mode"
    @click="colorMode.preference = toggle.preference"
    variant="ghost"
    :class="['size-12 flex justify-center items-center', toggle.class]"
  >
    <Icon :name="toggle.icon" class="text-xl" />
  </Button>
</template>
