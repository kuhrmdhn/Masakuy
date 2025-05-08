<script lang="ts" setup>
import NavItem from "./NavItem.vue";
const { authState } = useCurrentUser();
const user = computed(() =>authState.value)
const authNavList = [
  {
    id: 1,
    url: "/login",
    text: "Masuk",
    style: "bg-primary text-white",
  },
  {
    id: 2,
    url: "/register",
    text: "Daftar",
    style: "bg-white text-primary border border-primary",
  },
];
</script>

<template>
  <nav>
    <ul v-if="!user" class="flex gap-4 items-center">
      <li v-for="nav in authNavList" :key="nav.id">
        <NavItem :url="nav.url" :class="nav.style">
          {{ nav.text }}
        </NavItem>
      </li>
    </ul>
    <NavItem
      v-else
      url="/profile"
      class="text-primary flex items-center gap-2 border border-primary"
    >
      <Icon name="iconamoon:profile-fill" />
      Profile
    </NavItem>
  </nav>
</template>
