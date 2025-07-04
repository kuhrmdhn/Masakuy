import { Recipe } from '~/utils/zod/recipeSchema'

export default defineEventHandler(async (event) => {
  try {
    const { db } = useFirebase(event)
    const recipeCollection = db.collection('public_recipes')
    const allRecipeSnap = await recipeCollection.get()
    const recipesData = allRecipeSnap.docs.map((recipe) => ({
      id: recipe.id,
      ...recipe.data()
    })) as Recipe[]

    const query = getQuery(event)
    const recipeQueryTitle = query.title?.toString().trim().toLowerCase()

    const filteredRecipes = recipeQueryTitle
      ? recipesData.filter((e) =>
        e.title.toLowerCase().includes(recipeQueryTitle)
      )
      : recipesData

    return {
      success: true,
      data: filteredRecipes,
      message: recipeQueryTitle
        ? `Filtered recipes by title: "${recipeQueryTitle}"`
        : "Success get all recipes"
    }
  } catch (err) {
    const { message, cause } = err as Error
    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
      message,
      cause
    })
  }
})
