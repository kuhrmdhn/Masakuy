<script setup lang="ts">
import { ref } from "vue";
import { useRecipeCardOptionStore } from "~/utils/store/useRecipeCardOptionStore";

const author = ref<string>("");
const optionRef = ref<null | HTMLElement>(null)
const { getRecipeAuthor } = useRecipe();
const store = useRecipeCardOptionStore();
const props = defineProps<{
  recipeData: any;
}>();

const { recipeData } = props;
const { title, image, authorId, id } = recipeData;

function toggleOption() {
  store.toggleOpenOption(id);
}

useClickOutside(optionRef, () => {
  if(store.cardOptionId === id) {
    store.resetOpenOption()
  }
})

onMounted(async () => {
  const authorName = await getRecipeAuthor(authorId);
  author.value = authorName;
});
</script>

<template>
  <div ref="optionRef" class="w-62 rounded-xl overflow-hidden shadow-md bg-white border border-gray-200">
    <div class="w-full h-44 bg-gray-100 relative">
      <img :src="image" alt="Resep Makanan" class="object-cover w-full h-full" />
      <div class="absolute top-2 right-2">
        <button
          @click="toggleOption"
          class="text-gray-600 hover:text-gray-800 bg-white p-1 rounded-lg shadow-md cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm6.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </button>
        <Transition name="slide-right">
          <div
            v-show="id == store.cardOptionId"
            class="absolute right-0 mt-2 w-32 duration-200 bg-white border rounded shadow z-10"
          >
            <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Simpan
            </button>
            <button class="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              Bagikan
            </button>
          </div>
        </Transition>
      </div>
    </div>
    <div class="p-3 space-y-1">
      <p class="text-sm font-semibold truncate">{{ title }}</p>
      <p class="text-xs text-gray-500">
        oleh <span class="font-medium">{{ author }}</span>
      </p>
      <p class="text-sm text-gray-600 line-clamp-2">
        Nasi goreng dengan tambahan ayam, telur, dan bumbu rempah yang gurih dan lezat.
      </p>
    </div>
  </div>
</template>

<style scoped>
.text-clip-custom {
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  max-width: 18ch;
  text-overflow: ellipsis;
}
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.3s ease;
}
.slide-right-enter-from, .slide-right-leave-to {
  opacity: 0;
  transform: translateX(50%);
}
.slide-right-enter-to, .slide-right-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
