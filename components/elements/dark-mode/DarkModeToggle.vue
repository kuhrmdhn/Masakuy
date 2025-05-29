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
    @click="colorMode.preference = toggle.preference"
    variant="outline"
    :class="toggle.class"
  >
    <Icon :name="toggle.icon" class="h-[1.2rem] w-[1.2rem]" />
  </Button>
</template>
