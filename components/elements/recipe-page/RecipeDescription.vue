<script lang="ts" setup>
    const props = defineProps<{
      description?: string;
    }>();

    const recipeDescription = computed(() => {
      return props.description || "No description available.";
    }); 
</script>

<template>
  <p class="mb-6">
    {{ recipeDescription }}
  </p>
</template>
