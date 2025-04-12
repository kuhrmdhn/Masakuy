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
    class="h-5/6 w-4/5 bg-white"
    @submit.prevent="handleSubmit"
  >
    <header class="mb-7 h-1/4 flex flex-col justify-center">
      <h1 class="text-xl sm:text-3xl font-semibold">Selamat Datang Kembali!</h1>
      <p class="text-xs sm:text-md font-thin">
        Masukkan Email dan Kata Sandi dengan Benar
      </p>
    </header>
    <section>
      <div class="w-full mb-5" v-for="input in formInputList">
        <Label class="mb-2" :for="input.id">{{ input.label }}</Label>
        <Input
          :id="input.id"
          :v-model="input.value"
          :type="input.type"
          :placeholder="input.placeholder"
          class="h-12"
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
