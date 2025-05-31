<script lang="ts" setup>
import { useRecipeUtilityInput } from '~/utils/store/useRecipeUtilityInput';

const tableHeading = ["Langkah ke", "Keterangan"];
const inputData = reactive<typeof inputValueType[]>([]);
const inputValueType = { step: 1, description: "" };
const isSaveButtonEnabled = computed(() => {
  return inputData.length > 0 && inputData.every((input) => input.description !== "");
});
const getStepNumber = (index: number) => computed(() => index + 1);
const store = useRecipeUtilityInput()

function addRow() {
  inputData.push({ ...inputValueType });
}

function deleteRow(index: number) {
  inputData.splice(index, 1);
}

function saveInput() {
  alert("Saved");
}
</script>

<template>
  <div :class="['absolute h-full w-full overflow-y-auto flex flex-col items-end gap-7 pb-5 duration-500', store.style.stepsInput]">
    <table
      class="w-full border border-gary-300 dark:border-gray-700 h-auto table-fixed text-sm text-left shadow-md rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th
            v-for="(heading, index) of tableHeading"
            :class="['px-6 py-3', index === 1 ? 'w-5/6' : 'w-1/6']"
          >
            {{ heading }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(data, index) of inputData"
          class="border-b dark:border-gray-700 border-gray-200 w-full"
        >
          <th
            class="px-6 py-4 w-1/6 font-medium text-center text-gray-900 whitespace-nowrap dark:text-white"
          >
            <h1>{{ getStepNumber(index) }}</h1>
          </th>
          <td class="px-6 py-4 w-full flex justify-between gap-3">
            <Textarea rows="1" class="flex-1" v-model="data.description" />
            <Button variant="ghost" @click="deleteRow(index)" class="text-red-500">
              <Icon name="mingcute:delete-fill" />
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
    <section class="flex gap-3">
      <Button variant="ghost" @click="addRow" type="button" class="w-fit text-primary">
        <Icon name="radix-icons:plus" class="text-xl" />
        Tambah Baris Baru
      </Button>
      <Button
        :disabled="!isSaveButtonEnabled"
        @click="saveInput"
        type="button"
        class="w-fit"
      >
        <Icon name="mingcute:save-fill" class="text-xl" />
        Simpan
      </Button>
    </section>
  </div>
</template>
