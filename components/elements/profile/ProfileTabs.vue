<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserRecipe from "./UserRecipe.vue";
import UserSavedRecipe from "./UserSavedRecipe.vue";
</script>

<template>
  <Tabs default-value="userRecipes">
    <nav class="w-full flex justify-center mb-3">
      <TabsList class="w-1/5 bg-transparent">
        <TabsTrigger value="userRecipes"> Postingan </TabsTrigger>
        <TabsTrigger value="savedRecipes"> Disimpan </TabsTrigger>
      </TabsList>
    </nav>
    <TabsContent value="userRecipes">
      <UserRecipe />
    </TabsContent>
    <TabsContent value="savedRecipes">
      <UserSavedRecipe />
    </TabsContent>
  </Tabs>
</template>
