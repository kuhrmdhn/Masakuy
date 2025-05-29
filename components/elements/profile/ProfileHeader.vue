<script lang="ts" setup>
import ProfileTabs from "./ProfileTabs.vue";
import UserAvatar from "./UserAvatar.vue";
import type { User } from "~/utils/zod/userSchema";

const { data: userData } = await useAsyncData<{ data: User }>(
  "user-data",
  () => $fetch("/api/user/user-data"),
  { server: false }
);
</script>

<template>
  <section class="w-full h-36 flex justify-center items-center gap-15 mb-5">
    <UserAvatar />
    <div class="w-1/2 lg:w-1/4 h-32 flex flex-col gap-5">
      <span class="flex justify-between items-center">
        <h1 class="text-lg">{{ userData?.data.username }}</h1>
        <Button variant="secondary" class="font-semibold">Edit Profil</Button>
      </span>
      <span class="w-full h-full">
        <h2 class="font-semibold">{{ userData?.data.name }}</h2>
        <p class="font-light text-sm w-full">{{ userData?.data.bio }}</p>
      </span>
    </div>
  </section>
  <ProfileTabs />
</template>
