<script lang="ts" setup>
const { logOut } = useLogOut();

async function handleLogout() {
  try {
    await logOut();
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger variant="ghost">
      <Button variant="ghost">
        <Icon name="material-symbols:logout" class="text-xl text-red-500" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogTitle>Ingin Keluar dari Akun saat ini?</AlertDialogTitle>
      <div class="flex gap-5 justify-end">
        <AlertDialogCancel>Batal</AlertDialogCancel>
        <Button @click="handleLogout">Keluar</Button>
      </div>
    </AlertDialogContent>
  </AlertDialog>
</template>
