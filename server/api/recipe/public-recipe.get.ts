import { useDb } from '~/server/utils/useDb'

export default defineEventHandler(async (event) => {
    try {
        const { db } = useDb(event)
        const recipeSnap = await db.collection('public_recipes').get()
        const recipesData = recipeSnap.docs.map((recipe) => ({ id: recipe.id, ...recipe.data() }))

        return {
            success: true,
            data: recipesData,
            message: "Success get all recipes"
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