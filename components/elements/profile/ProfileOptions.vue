<script lang="ts" setup>
import LogoutButton from "./LogoutButton.vue";
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost">
        <Icon name="iwwa:option-horizontal" class="text-2xl" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="h-full w-fit flex flex-col gap-2 items-center py-2">
      <NuxtLink href="/profile/edit">
        <Button variant="secondary" class="font-semibold">Edit Profil</Button>
      </NuxtLink>
      <LogoutButton />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
