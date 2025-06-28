<script lang="ts" setup>
import ImageInput from "~/components/ui/image-input/ImageInput.vue";

const userPhotoProfile = ref(
  "https://i.pinimg.com/736x/3c/5d/84/3c5d84d62b4d6ac91174c36ecd89dcbd.jpg"
);

function saveImage(data: string) {
  userPhotoProfile.value = data;
}
</script>

<template>
  <div>
    <ImageInput :initial-image="userPhotoProfile" :save-image-input="saveImage" />
  </div>
</template>
