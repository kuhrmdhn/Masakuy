import { postRecipeSchema } from "~/utils/zod/recipeSchema"

export default defineEventHandler(async (event) => {
    try {
        const { recipeData } = await readBody(event)
        const { db } = useDb(event)
        const { verifyUserToken } = useToken(event)

        const { uid } = await verifyUserToken()

        const validateRecipeSchema = postRecipeSchema.safeParse({ ...recipeData, authorId: uid })
        if (validateRecipeSchema.error) {
            throw createError({
                message: validateRecipeSchema.error.message,
                statusCode: 400,
                statusMessage: "Bad request",
                cause: "Invalid upload data schema"
            })
        }

        const userRecipeRef = await db.collection(`users/${uid}/user_recipe`).add({ ...validateRecipeSchema.data })
        await userRecipeRef.update({ id: userRecipeRef.id })

        const publicRecipeSnap = await userRecipeRef.get();
        const publicRecipeData = publicRecipeSnap.data();

        const publicRecipesRef = await db.collection("public_recipes").add({ ...publicRecipeData })
        await publicRecipesRef.update({ publicId: publicRecipesRef.id })

        return {
            success: true,
            message: `Success upload user recipe`,
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