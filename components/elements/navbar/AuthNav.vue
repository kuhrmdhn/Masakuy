<script lang="ts" setup>
import UserAvatar from "../profile/UserAvatar.vue";
import NavItem from "./NavItem.vue";
const { authState } = useCurrentUser();
const user = computed(() => authState.value);
const authNavList = [
  {
    id: 1,
    url: "/login",
    text: "Masuk",
    style: "bg-primary text-white",
    icon: "uil:signin"
  },
  {
    id: 2,
    url: "/register",
    text: "Daftar",
    style: "bg-white dark:bg-background text-primary border border-primary",
    icon: "mdi:register-outline"
  },
];
</script>

<template>
  <div v-if="!user" class="flex gap-5 items-center">
    <NavItem v-for="nav in authNavList" :key="nav.id" :url="nav.url" :class="[nav.style, 'flex justify-center items-center']">
      <h1 class="hidden lg:block">
        {{ nav.text }}
      </h1>
      <Icon :name="nav.icon" class="text-xl"/>
    </NavItem>
  </div>
  <NavItem v-else url="/profile">
    <UserAvatar class="!size-10" />
  </NavItem>
</template>
