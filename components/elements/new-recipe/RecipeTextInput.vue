<script lang="ts" setup>
import Input from "~/components/ui/input/Input.vue";
import Textarea from "~/components/ui/textarea/Textarea.vue";
import { useRecipeFormData } from "~/utils/store/useRecipeFormData";

type FormFieldKey = keyof typeof formStore.formData;
interface InputMeta {
  component: any;
  placeholder: string;
  key: FormFieldKey;
  type?: string;
  required?: boolean;
  min?: number;
}

const formStore = useRecipeFormData();
function updateFormData(field: FormFieldKey, value: string | number) {
  formStore.setFormData({ [field]: value });
}

const inputTextData: InputMeta[] = [
  {
    component: Input,
    placeholder: "Nama Resep",
    type: "text",
    required: true,
    key: "title",
  },
  {
    component: Textarea,
    placeholder: "Deskripsi Resep (Opsional)",
    key: "description",
  },
  {
    component: Input,
    placeholder: "Jumlah Penyajian",
    type: "number",
    required: true,
    min: 1,
    key: "serving",
  },
];
</script>

<template>
  <component
    v-for="input in inputTextData"
    :key="input.key"
    :is="input.component"
    :type="input.type"
    :required="input.required"
    :placeholder="input.placeholder"
    :min="input.min"
    :model-value="formStore.formData[input.key]"
    @update:model-value="(value:string | number) => updateFormData(input.key, value)"
  />
</template>
