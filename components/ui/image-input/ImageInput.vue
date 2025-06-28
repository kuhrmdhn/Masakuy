<script lang="ts" setup>
const props = defineProps<{
  initialImage: string;
  saveImageInput: (image: string) => void;
}>();
const imageInput = ref();
const dialogShow = ref(false);

function hideDialog() {
  dialogShow.value = false;
}
function showDialog() {
  dialogShow.value = true;
}

function changeImage(e: Event) {
  const target = e.target as HTMLInputElement;
  const { files } = target;
  if (!files) return;
  imageInput.value = URL.createObjectURL(files[0]);
  showDialog();
}

function saveImage() {
  props.saveImageInput(imageInput.value);
  hideDialog();
}
</script>

<template>
  <div class="relative size-56">
    <img class="size-full absolute top-0 -z-10" :src="initialImage" alt="Ei" />
    <div class="size-full group flex justify-center items-center">
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <button
            class="absolute inset-0 group-hover:opacity-100 opacity-0 hover:bg-black/60 duration-300"
          >
            <Icon name="radix-icons:pencil-1" class="text-white text-3xl m-auto" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" class="ml-12">
          <DropdownMenuLabel>Ganti Foto</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem>
            <Label>
              Ganti
              <Input
                type="file"
                class="hidden"
                @change="(e:Event) => changeImage(e)"
                accept="image/*"
              />
            </Label>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
  <div>
    <AlertDialog :open="dialogShow">
      <AlertDialogContent class="w-fit">
        <img :src="imageInput" alt="Preview Image" class="size-80" />
        <div class="flex gap-3 justify-end">
          <AlertDialogCancel class="w-1/3" @click="hideDialog">Batal</AlertDialogCancel>
          <AlertDialogAction class="w-1/3" @click="saveImage">Simpan</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
