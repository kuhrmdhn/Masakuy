<script lang="ts" setup>
import RecipeForm from "~/components/elements/new-recipe/RecipeForm.vue";
import Input from "~/components/ui/input/Input.vue";
import Textarea from "~/components/ui/textarea/Textarea.vue";

useSeoMeta({
  title: "New Post",
});
</script>

<template>
  <section class="w-full min-h-[80dvh] flex justify-around pt-5">
    <RecipeForm />
    <div class="relative h-full w-3/5 overflow-y-auto">
      <table
        class="w-full border border-gray-700 h-auto table-fixed text-sm text-left shadow-md rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th class="px-6 py-3 w-1/6">Jumlah</th>
            <th class="px-6 py-3 w-1/6">Satuan</th>
            <th class="px-6 py-3 w-1/2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b dark:border-gray-700 border-gray-200">
            <th
              class="px-6 py-4 w-1/6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              <Input placeholder="1" type="number" min="1" />
            </th>
            <td class="px-6 py-4 w-1/6">
              <Input placeholder="liter" type="text" pattern="[a-zA-Z]*" />
            </td>
            <td class="px-6 py-4 w-1/2">
              <Textarea rows="1" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
