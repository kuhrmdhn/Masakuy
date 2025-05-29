<script setup lang="ts">
const { data: user } = await useAsyncData(
  "user-photo-profile",
  () => $fetch("/api/user/user-data/photo-profile"),
  { server: false }
);
</script>

<template>
  <Avatar class="size-28 lg:size-32">
    <AvatarImage v-if="user?.data.photo_profile" :src="user.data.photo_profile" :alt="user.data.username" />
    <AvatarFallback>
      <Icon class="text-5xl" name="solar:user-bold-duotone"/>
    </AvatarFallback>
  </Avatar>
</template>
