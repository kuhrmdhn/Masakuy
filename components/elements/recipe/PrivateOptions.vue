<script lang="ts" setup>
const props = defineProps<{
  recipeId: string;
}>();
const dialogShow = ref(false);
const { deleteRecipe } = useUserRecipeOptions(props.recipeId);

function showDialog() {
  dialogShow.value = true;
}

function hideDialog() {
  dialogShow.value = false;
}

function editRecipeNavigation() {
  navigateTo(`/profile/recipe/${props.recipeId}`);
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button class="size-fit px-1 text-primary" variant="ghost">
        <Icon name="tabler:dots" class="text-xl" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="top" class="mb-3 flex flex-col gap-2 py-2">
      <DropdownMenuItem @click="editRecipeNavigation">
        <Icon name="radix-icons:pencil-1" class="text-lg" />
        Edit
      </DropdownMenuItem>
      <DropdownMenuItem @click="showDialog" class="text-red-500 hover:!text-red-500">
        <Icon name="radix-icons:trash" class="text-lg" />
        Hapus
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <AlertDialog :open="dialogShow">
    <AlertDialogContent class="flex flex-col">
      <AlertDialogTitle>Hapus Resep?</AlertDialogTitle>
      <AlertDescription>Setelah dihapus resep tidak dapat dipulihkan</AlertDescription>
      <div class="flex gap-3 justify-end">
        <Button @click="() => deleteRecipe(hideDialog)" variant="outline">Hapus</Button>
        <Button @click="hideDialog">Batal</Button>
      </div>
    </AlertDialogContent>
  </AlertDialog>
</template>
