<script lang="ts" setup>
import ImageInput from "~/components/ui/image-input/ImageInput.vue";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useAlertStore } from "~/utils/store/useAlertStore";
import { useUserData } from "~/utils/store/useUserData";
import type { User } from "~/utils/zod/userSchema";

const { showAlert } = useAlertStore();
const userDataStore = useUserData();
const { setUserData } = useUserData();
const { userData } = storeToRefs(userDataStore);
const { saveUserPhotoProfile } = useUploadUserPhotoProfile();
const inputData: {
  label: string;
  key: keyof Pick<User, "name" | "username" | "bio">;
  component?: any;
}[] = [
  { label: "Nama", key: "name" },
  { label: "Nama Pengguna", key: "username" },
  { label: "Bio", key: "bio", component: Textarea },
];

function handleUpdateModel(
  value: number | string,
  key: keyof Pick<User, "name" | "username" | "bio">
) {
  if (!userData) return;

  setUserData({
    ...userData.value,
    [key]: value,
  } as User);
}

const handleSubmit = async () => {
  try {
    await $fetch("/api/user/user-data/edit", {
      method: "PATCH",
      body: { newData: { ...userData.value } },
    });
    showAlert("Profil disimpan", "Profil sukses diperbarui", "success");
  } catch (err) {
    const error = err as Error;
    showAlert(error.name, error.message, "destructive");
  }
};
</script>

<template>
  <form
    class="max-w-xl w-4/5 h-full py-5 flex flex-col items-center gap-5"
    v-if="userData"
    @submit.prevent="handleSubmit"
  >
    <ImageInput
      :save-image-input="saveUserPhotoProfile"
      :initial-image="userData.photo_profile || '/image/image-default.jpeg'"
    />
    <Label
      v-for="input in inputData"
      class="flex flex-col lg:flex-row w-full items-start gap-2 lg:justify-between"
    >
      {{ input.label }}
      <component
        class="w-full lg:w-3/4"
        :is="input.component || Input"
        :key="input.key"
        :label="input.label"
        :model-value="userData?.[input.key] ?? ''"
        @update:model-value="(value: string | number) => handleUpdateModel(value, input.key)"
      />
    </Label>
    <Button class="self-end" type="submit">Simpan</Button>
  </form>
</template>
