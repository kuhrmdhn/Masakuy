<script lang="ts" setup>
import ImageInput from "~/components/ui/image-input/ImageInput.vue";
import { useUserData } from "~/utils/store/useUserData";

const userDataStore = useUserData();
const { userData } = storeToRefs(userDataStore);
const { saveUserPhotoProfile } = useUploadUserPhotoProfile();
</script>

<template>
  <div>
    <ImageInput
      :save-image-input="saveUserPhotoProfile"
      :initial-image="userData?.photo_profile || ''"
    />
    <p>{{ userData?.name }}</p>
    <p>{{ userData?.username }}</p>
    <p>{{ userData?.bio }}</p>
  </div>
</template>
