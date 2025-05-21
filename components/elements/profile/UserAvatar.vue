<script setup lang="ts">
import Avatar from "~/components/ui/avatar/Avatar.vue";
import AvatarFallback from "~/components/ui/avatar/AvatarFallback.vue";
import AvatarImage from "~/components/ui/avatar/AvatarImage.vue";

defineProps<{
  photoProfile: string,
  username: string
}>()
</script>

<template>
  <Avatar class="size-32">
    <AvatarImage :src="photoProfile" :alt="username" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</template>
