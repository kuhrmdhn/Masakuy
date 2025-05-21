<script lang="ts" setup>
import Button from "~/components/ui/button/Button.vue";
import ProfileTabs from "./ProfileTabs.vue";
import UserAvatar from "./UserAvatar.vue";
type UserFetchResponse = {
  data: {
    username: string;
    photo_profile: string;
    bio: string;
    name: string;
  };
};

const { data: userData } = await useAsyncData<UserFetchResponse>(
  "user-data",
  () => $fetch("/api/user/user-data"),
  { server: false }
);
</script>

<template>
  <section class="w-full h-36 flex justify-center items-center gap-15 mb-5">
    <UserAvatar
      :photo-profile="userData?.data.photo_profile || ''"
      :username="userData?.data.username || ''"
    />
    <div class="min-w-1/6 max-w-1/4 h-full pt-5 flex flex-col gap-5">
      <span class="flex justify-between items-center">
        <h1 class="text-lg">{{ userData?.data.username }}</h1>
        <Button variant="secondary" class="font-semibold">Edit Profil</Button>
      </span>
      <span>
        <h2 class="font-semibold">{{ userData?.data.name }}</h2>
        <p class="font-light text-sm">{{ userData?.data.bio }}</p>
      </span>
    </div>
  </section>
  <ProfileTabs />
</template>
