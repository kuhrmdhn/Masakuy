<script setup lang="ts">
import { Button } from "@/components/ui/button";
const { currentUser } = useAuth();
currentUser()
</script>

<template>
  <Button>Button</Button>
</template>
