<script lang="ts" setup>
const isShowSearchBar = useState("is-show-search-bar", () => false)

function toggleSearchBar() {
    isShowSearchBar.value = !isShowSearchBar.value
}
</script>

<template>
  <Button variant="ghost" @click="toggleSearchBar">
    <Icon :name="isShowSearchBar ? 'mingcute:close-fill' : 'ic:twotone-search'" class="size-5" />
  </Button>
</template>
