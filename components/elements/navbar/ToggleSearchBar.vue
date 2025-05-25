<script lang="ts" setup>
import Button from "~/components/ui/button/Button.vue";
import { Icon } from "@iconify/vue";

const isShowSearchBar = useState("is-show-search-bar", () => false)

function toggleSearchBar() {
    isShowSearchBar.value = !isShowSearchBar.value
}
</script>

<template>
  <Button variant="ghost" @click="toggleSearchBar">
    <Icon :icon="isShowSearchBar ? 'mingcute:close-fill' : 'ic:twotone-search'" class="size-5" />
  </Button>
</template>
