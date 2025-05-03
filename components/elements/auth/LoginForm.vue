<script setup lang="ts">
import { NuxtLink } from "#components";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { SignInData } from "~/utils/zod/authSchema";

const { signIn } = useLogin();
const loginFormFields = [
  {
    id: "loginEmailInput",
    key: "email",
    label: "Email",
    placeholder: "Masukkan email",
    type: "email",
  },
  {
    id: "loginPasswordInput",
    key: "password",
    label: "Kata Sandi",
    placeholder: "Masukkan kata sandi",
    type: "password",
  },
];

const loginFormData = reactive<Record<string, string>>({});
loginFormFields.forEach((field) => {
  loginFormData[field.key] = "";
});
async function handleUserLogin() {
  await signIn(loginFormData as SignInData);
}
</script>

<template>
  <form
    class="min-h-80 h-3/5 sm:h-1/2 w-full sm:w-3/4 lg:w-4/5 px-5 bg-white lg:bg-transparent rounded-md"
    @submit.prevent="handleUserLogin"
  >
    <header class="mb-3 sm:mb-7 h-1/5 xs:h-1/4 flex flex-col justify-center">
      <h1 class="text-lg sm:text-3xl font-semibold">Selamat Datang Kembali!</h1>
      <p class="text-xs sm:text-md font-thin">
        Masukkan Email dan Kata Sandi dengan Benar
      </p>
    </header>
    <section class="mb-7 xs:m-0">
      <div class="w-full mb-3 xs:mb-5" v-for="input in loginFormFields">
        <Label class="mb-2 text-xs xs:text-base" :for="input.id">{{ input.label }}</Label>
        <Input
          :id="input.id"
          v-model="loginFormData[input.key]"
          :type="input.type"
          :placeholder="input.placeholder"
          class="h-10 xs:h-12 text-xs xs:text-base"
          :minLength="input.type === 'password' && '8'"
          required
        />
      </div>
    </section>
    <div class="flex flex-col gap-5 items-center">
      <Button class="w-full" type="submit">Masuk</Button>
      <p>Belum memiliki akun? <NuxtLink class="underline text-primary" href="/register">Daftar</NuxtLink></p>
    </div>
  </form>
</template>
