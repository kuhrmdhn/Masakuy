<script setup>
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const { signIn } = useAuth();
const formInput = reactive({
  email: "",
  password: "",
});
const formInputList = [
  {
    id: "emailInput",
    label: "Email",
    placeholder: "Masukkan email",
    value: formInput.email,
    type: "email",
  },
  {
    id: "passwordInput",
    label: "Kata Sandi",
    placeholder: "Masukkan kata sandi",
    value: formInput.password,
    type: "password",
  },
];

async function handleSubmit() {
  await signIn(formInput.email, formInput.password);
}

function handleRegister() {
  navigateTo("/register");
}
</script>

<template>
  <form
    class="min-h-80 h-3/5 sm:h-1/2 w-full sm:w-3/4 lg:w-4/5 px-5 bg-white rounded-md"
    @submit.prevent="handleSubmit"
  >
    <header class="mb-3 sm:mb-7 h-1/5 xs:h-1/4 flex flex-col justify-center">
      <h1 class="text-lg sm:text-3xl font-semibold">Selamat Datang Kembali!</h1>
      <p class="text-xs sm:text-md font-thin">
        Masukkan Email dan Kata Sandi dengan Benar
      </p>
    </header>
    <section class="mb-7 xs:m-0">
      <div class="w-full mb-3 xs:mb-5" v-for="input in formInputList">
        <Label class="mb-2 text-xs xs:text-base" :for="input.id">{{ input.label }}</Label>
        <Input
          :id="input.id"
          :v-model="input.value"
          :type="input.type"
          :placeholder="input.placeholder"
          class="h-10 xs:h-12 text-xs xs:text-base"
          required
        />
      </div>
    </section>
    <div class="flex gap-4">
      <Button type="submit">Masuk</Button>
      <Button @click.prevent="handleRegister" type="button" variant="outline">
        Daftar
      </Button>
    </div>
  </form>
</template>
