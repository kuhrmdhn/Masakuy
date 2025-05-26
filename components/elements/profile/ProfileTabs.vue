<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserRecipe from "./UserRecipe.vue";
import UserSavedRecipe from "./UserSavedRecipe.vue";

const route = useRoute();
const router = useRouter();

const tab = ref((route.query.tabs as string) || 'user-post')

watch(tab, (newTab) => {
  router.replace({ query: { ...route.query, tabs: newTab } })
})

watch(
  () => route.query.tabs,
  (newQueryTab) => {
    if (newQueryTab && newQueryTab !== tab.value) {
      tab.value = newQueryTab as string
    }
  }
)
</script>

<template>
  <Tabs v-model="tab" class="w-full">
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
