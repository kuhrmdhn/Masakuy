export const useUserSavedRecipes = defineStore("user-saved-recipes", () => {
  const userSavedRecipesId = ref<string[]>([])
  const isFetched = ref(false)

  const savedSet = computed(() => new Set(userSavedRecipesId.value))

  function setUserSavedRecipes(recipes: string[]) {
    userSavedRecipesId.value = recipes
    isFetched.value = true
  }

  function addUserSavedRecipe(id: string) {
    userSavedRecipesId.value = [...userSavedRecipesId.value, id]
  }

  function removeUserSavedRecipe(id: string) {
    const index = userSavedRecipesId.value.indexOf(id)
    userSavedRecipesId.value.splice(index, 1)
    userSavedRecipesId.value = userSavedRecipesId.value
  }

  function isSavedRecipe(recipeId: string) {
    return savedSet.value.has(recipeId)
  }

  return { userSavedRecipesId, setUserSavedRecipes, isSavedRecipe, isFetched, addUserSavedRecipe, removeUserSavedRecipe }
})
