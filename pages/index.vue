<script setup>
const { currentUser } = useAuth();
onMounted(() => {
  const user = currentUser();
  console.log({ user });
});
</script>

<template>
  <h1>Hello Nuxt JS</h1>
</template>
