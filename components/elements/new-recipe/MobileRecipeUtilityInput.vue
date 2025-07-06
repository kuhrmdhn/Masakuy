<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger class="w-fit">
      <Button variant="ghost" type="button" class="w-fit text-primary">
        {{ title }}
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent class="min-h-[50dvh]">
      <slot />
      <AlertDialogCancel>Tutup</AlertDialogCancel>
    </AlertDialogContent>
  </AlertDialog>
</template>
