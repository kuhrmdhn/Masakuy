<script lang="ts" setup>
import { useUserData } from "~/utils/store/useUserData";

const userDataStore = useUserData();
const { userData } = storeToRefs(userDataStore);
</script>

<template>
  <div>
    <img :src="userData?.photo_profile" />
    <p>{{ userData?.name }}</p>
    <p>{{ userData?.username }}</p>
    <p>{{ userData?.bio }}</p>
  </div>
</template>
