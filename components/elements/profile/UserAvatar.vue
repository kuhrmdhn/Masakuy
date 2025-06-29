<script setup lang="ts">
import { useUserData } from "~/utils/store/useUserData";

const userDataStore = useUserData();
const { userData } = storeToRefs(userDataStore);
</script>

<template>
  <Avatar class="size-28 lg:size-32">
    <AvatarImage
      v-if="userData?.photo_profile"
      :src="userData.photo_profile"
      :alt="userData.username"
    />
    <AvatarFallback>
      <Icon class="text-5xl" name="solar:user-bold-duotone" />
    </AvatarFallback>
  </Avatar>
</template>
