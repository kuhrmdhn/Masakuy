<script setup lang="ts">
import UserRecipe from "./UserRecipe.vue";
import UserSavedRecipe from "./UserSavedRecipe.vue";
</script>

<template>
  <Tabs default-value="user-post" class="w-full">
    <nav class="w-full flex justify-center mb-3">
      <TabsList class="w-1/2 sm:w-1/5 bg-transparent">
        <TabsTrigger value="user-post">Postingan</TabsTrigger>
        <TabsTrigger value="user-saved">Disimpan</TabsTrigger>
      </TabsList>
    </nav>
    <TabsContent value="user-post">
      <UserRecipe />
    </TabsContent>
    <TabsContent value="user-saved">
      <UserSavedRecipe />
    </TabsContent>
  </Tabs>
</template>
