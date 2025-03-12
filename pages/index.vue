<script lang="ts" setup>
import { reactive } from "vue";

type Recipe = {
  image: File | null;
  authorId: string;
  ingredients: string[];
  steps: string[];
  title: string;
};

const recipeData = reactive({
  image: null as File | null,
  authorId: "ABCD",
  ingredients: [""],
  steps: [""],
  title: "asd",
});

function inputImage(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files?.length) {
    recipeData.image = target.files[0];
  }
}

async function submit(e: Event) {
  e.preventDefault();

  if (!recipeData.image) {
    console.error("No image selected");
    return;
  }

  const formData = new FormData();

  for (const key in recipeData) {
    const value = recipeData[key as keyof Recipe];

    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  }

  const { data } = await useFetch("/api/user/change-user-profile", {
    method: "PATCH",
    body: formData,
  });
}
</script>

<template>
  <form @submit="submit">
    <input type="file" @change="inputImage" />
    <button type="submit">Submit</button>
  </form>
</template>
