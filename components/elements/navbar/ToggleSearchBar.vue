<script lang="ts" setup>
const isShowSearchBar = useState("is-show-search-bar", () => false)

function toggleSearchBar() {
    isShowSearchBar.value = !isShowSearchBar.value
}

const icons = computed(() => isShowSearchBar.value ? 'mingcute:close-fill' : 'ic:twotone-search')
</script>

<template>
  <Button variant="ghost" @click="toggleSearchBar">
    <Icon :name="icons" class="text-xl" />
  </Button>
</template>
