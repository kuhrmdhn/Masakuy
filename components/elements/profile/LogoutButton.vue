<script lang="ts" setup>
const { logOut } = useAuth();

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
      <Button variant="destructive">
        Keluar
        <Icon name="material-symbols:logout" class="text-xl" />
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
