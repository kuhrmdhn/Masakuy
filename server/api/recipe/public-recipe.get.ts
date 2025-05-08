import { useDb } from '~/server/utils/useDb'

export default defineEventHandler(async (event) => {
    try {
        const date = new Date()
        console.log("Get pub recipe!", date.getHours(), date.getMinutes())
        const { db } = useDb(event)
        const recipeSnap = await db.collection('public_recipes').get()
        if (recipeSnap.empty) {
            setResponseStatus(event, 200)
            return {
                success: true,
                message: "Recipes is empty",
                data: []
            }
        }
        const recipesData = recipeSnap.docs.map((recipe) => ({ id: recipe.id, ...recipe.data() }))
        return {
            success: true,
            data: { recipesData },
            message: "Success get all recipes"
        }
    } catch (err) {
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to fetch public recipes"
        })
    }
})