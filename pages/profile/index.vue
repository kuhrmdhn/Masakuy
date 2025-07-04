<script lang="ts" setup>
import LogoutButton from "~/components/elements/profile/LogoutButton.vue";
import ProfileTabs from "~/components/elements/profile/ProfileTabs.vue";
import UserAvatar from "~/components/elements/profile/UserAvatar.vue";
import { useUserData } from "~/utils/store/useUserData";

const userDataStore = useUserData();
const { initializeUserData } = userDataStore;
const { userData } = storeToRefs(userDataStore);

onMounted(async () => {
  await initializeUserData();
});

useSeoMeta({
  title: "Profile",
});
</script>

<template>
  <div>
    <section class="w-full h-36 flex justify-center items-center gap-15 mb-5">
      <UserAvatar />
      <div class="w-1/2 lg:w-[30%] h-32 flex flex-col gap-5">
        <span class="flex justify-between items-center">
          <h1 class="text-lg">{{ userData?.username }}</h1>
          <div class="h-full w-fit flex gap-2">
            <NuxtLink href="/profile/edit">
              <Button variant="secondary" class="font-semibold">Edit Profil</Button>
            </NuxtLink>
            <LogoutButton />
          </div>
        </span>
        <span class="w-full h-full">
          <h2 class="font-semibold">{{ userData?.name }}</h2>
          <p class="font-light text-sm w-full">{{ userData?.bio }}</p>
        </span>
      </div>
    </section>
    <ProfileTabs />
  </div>
</template>
