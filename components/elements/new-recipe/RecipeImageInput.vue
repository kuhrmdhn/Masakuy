<script lang="ts" setup>
import { useRecipeFormData } from "~/utils/store/useRecipeFormData";
import RecipeImagePreview from "../recipe-page/RecipeImagePreview.vue";
import LoadingUI from "~/components/ui/loading/LoadingUI.vue";

const dialogShow = ref(false);
const dialogRef = ref<HTMLElement | null>(null);
const formStore = useRecipeFormData();
useClickOutside(dialogRef, () => hideDialog());

const {
  image,
  uploadLoadingStatus,
  changeImage,
  deleteImage,
  uploadImage,
} = useRecipeImageForm();

function hideDialog() {
  dialogShow.value = false;
}
function showDialog() {
  dialogShow.value = true;
}
async function saveImage() {
  const isUploading = uploadLoadingStatus.value;
  if (!isUploading) {
    await uploadImage(hideDialog);
  }
}
</script>

<template>
  <div class="relative flex justify-center items-center">
  <span v-if="uploadLoadingStatus" class="h-full w-full absolute z-40">
    <LoadingUI class="!size-full"/>
  </span>
    <RecipeImagePreview :src="formStore.formData.image" :alt="formStore.formData.title">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <button
            class="absolute inset-0 group-hover:opacity-100 opacity-0 hover:bg-black/60 duration-300"
          >
            <Icon name="radix-icons:pencil-1" class="text-white text-3xl m-auto" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          <DropdownMenuLabel>Foto Resep</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="p-0 h-10 pl-2">
            <Label class="w-full h-full">
              <Icon name="radix-icons:pencil-1" class="text-lg" />
              Ganti
              <Input
                @change="(e:Event) => changeImage(e, showDialog)"
                type="file"
                class="hidden"
                accept="image/*"
              />
            </Label>
          </DropdownMenuItem>
          <DropdownMenuItem
            @click="deleteImage"
            class="text-red-500 hover:!text-red-500 p-0 h-10 pl-2"
          >
            <Icon name="radix-icons:trash" class="text-lg" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </RecipeImagePreview>
  </div>
  <div ref="dialogRef">
    <AlertDialog :open="dialogShow">
      <AlertDialogContent class="w-fit">
        <RecipeImagePreview :src="image.previewDialog" alt="Preview Image" />
        <div class="flex gap-3 justify-end">
          <AlertDialogCancel class="w-1/3" @click="hideDialog">Batal</AlertDialogCancel>
          <AlertDialogAction class="w-1/3" @click="saveImage">Simpan</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
