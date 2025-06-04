<script lang="ts" setup>
import { useRecipeFormData } from "~/utils/store/useRecipeFormData";

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
  <div class="size-64 flex relative gap-3 group">
    <img
      class="aspect-square object-center object-cover"
      :src="formStore.formData.image"
      alt="Post recipe image"
    />
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
  </div>
  <div ref="dialogRef">
    <AlertDialog :open="dialogShow">
      <AlertDialogContent class="w-fit">
        <img
          :src="image.previewDialog"
          alt="Preview Image"
          class="h-80 mx-auto aspect-square object-center object-cover"
        />
        <div class="flex gap-3 justify-end">
          <AlertDialogCancel class="w-1/3" @click="hideDialog">Batal</AlertDialogCancel>
          <AlertDialogAction class="w-1/3" @click="saveImage">Simpan</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
