<script lang="ts" setup>
import LogoutButton from "~/components/elements/profile/LogoutButton.vue";
import ProfileOptions from "~/components/elements/profile/ProfileOptions.vue";
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
    <section
      class="w-full h-36 flex justify-center items-center gap-5 xl:gap-10 mb-5 px-2"
    >
      <UserAvatar />
      <div class="w-full lg:w-[30%] h-32 flex flex-col gap-5">
        <span class="flex justify-between items-center">
          <h1 class="text-lg">{{ userData?.username }}</h1>
          <ProfileOptions />
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
