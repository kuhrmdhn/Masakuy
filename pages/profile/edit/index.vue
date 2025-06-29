<script lang="ts" setup>
import UserDataForm from "~/components/elements/profile/UserDataForm.vue";
import { useUserData } from "~/utils/store/useUserData";
const userDataStore = useUserData();
const { userData } = storeToRefs(userDataStore);

useSeoMeta({
  title: `${userData.value?.username} Edit Profile`,
});
</script>

<template>
  <div>
    <UserDataForm />
  </div>
</template>
