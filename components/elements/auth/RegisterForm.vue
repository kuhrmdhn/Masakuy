<script lang="ts" setup>
import { useAlertStore } from "~/utils/store/useAlertStore";

const { register } = useAuth();
const { showAlert } = useAlertStore();
const registerFormFields = [
  {
    id: "registerEmailInput",
    key: "email",
    placeholder: "johnDoe@example.com",
    label: "Email",
    type: "email",
  },
  {
    id: "registerUsernameInput",
    key: "username",
    placeholder: "itsJohn",
    label: "Nama Pengguna",
    type: "text",
  },
  {
    id: "registerPasswordInput",
    key: "password",
    placeholder: "john-doe-password",
    label: "Kata Sandi",
    type: "password",
  },
  {
    id: "registerConfirmPasswordInput",
    key: "confirmPassword",
    placeholder: "john-doe-password",
    label: "Ulangi Kata Sandi",
    type: "password",
  },
];

const registerFormState = reactive<Record<string, string>>({});
registerFormFields.forEach((field) => {
  registerFormState[field.key] = "";
});

async function handleRegisterUser() {
  const { email, password, confirmPassword, username } = registerFormState;
  if (password !== confirmPassword) {
    showAlert(
      "Kata sandi tidak cocok!",
      "Silakan isi ulang konfirmasi kata sandi agar sesuai dengan kata sandi utama.",
      "destructive"
    );
    return;
  }
  const registerData = { email, password, username };
  await register(registerData);
}
</script>

<template>
  <form
    class="min-h-80 h-5/6 xs:h-11/12 sm:h-3/5 md:h-[63%] lg:h-full w-full sm:w-3/4 lg:w-4/5 px-5 bg-background/80 lg:bg-transparent rounded-md"
    @submit.prevent="handleRegisterUser"
  >
    <header class="mb-3 sm:mb-3 h-1/6 sm:h-1/5 flex flex-col justify-center">
      <h1 class="text-lg sm:text-3xl font-semibold">Selamat Datang!</h1>
      <p class="text-xs sm:text-md font-thin">Daftarkan Akun Kamu</p>
    </header>
    <section class="mb-7 xs:m-0">
      <div class="w-full mb-3 xs:mb-5" v-for="input in registerFormFields">
        <Label class="mb-2 text-xs xs:text-base" :for="input.id">{{ input.label }}</Label>
        <Input
          :id="input.id"
          v-model="registerFormState[input.key]"
          :type="input.type"
          :placeholder="input.placeholder"
          class="h-10 xs:h-12 text-xs xs:text-base"
        />
      </div>
    </section>
    <div class="flex flex-col gap-5 items-center">
      <Button class="w-full" type="submit">Daftar</Button>
      <p>
        Sudah memiliki akun?
        <NuxtLink class="underline text-primary" href="/login">Masuk</NuxtLink>
      </p>
    </div>
  </form>
</template>
