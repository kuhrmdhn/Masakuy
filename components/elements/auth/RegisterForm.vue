<script lang="ts" setup>
import Button from "~/components/ui/button/Button.vue";
import Input from "~/components/ui/input/Input.vue";
import Label from "~/components/ui/label/Label.vue";
import { useAlertStore } from "~/utils/store/useAlertStore";

const { signUp } = useAuth();
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

async function handleUserRegister() {
  const { email, password, confirmPassword } = registerFormState;
  if (password !== confirmPassword) {
    showAlert(
      "Kata sandi tidak cocok!",
      "Silakan isi ulang konfirmasi kata sandi agar sesuai dengan kata sandi utama.",
      "destructive"
    );
    return;
  }
  await signUp(email, password);
}
</script>

<template>
  <form
    class="min-h-80 h-5/6 xs:h-3/4 sm:h-3/5 lg:h-5/6 w-full sm:w-3/4 lg:w-4/5 px-5 bg-white lg:bg-transparent rounded-md"
    @submit.prevent="handleUserRegister"
  >
    <header class="mb-3 sm:mb-7 h-1/5 xs:h-1/4 flex flex-col justify-center">
      <h1 class="text-lg sm:text-3xl font-semibold">Selamat Datang!</h1>
      <p class="text-xs sm:text-md font-thin">Daftarkan Email dan Kata Sandi</p>
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
      <p>Sudah memiliki akun? <NuxtLink class="underline text-primary" href="/login">Masuk</NuxtLink></p>
    </div>
  </form>
</template>
