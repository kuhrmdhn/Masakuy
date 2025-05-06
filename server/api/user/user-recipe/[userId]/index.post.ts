import { uploadRecipeSchema } from "~/utils/zod/recipeSchema"

export default defineEventHandler(async (event) => {
    try {
        const params = event.context.params
        const cookie = getCookie(event,"firebase_access_token")
        const body = await readBody(event)
        const { db } = useDb(event)

        if(!cookie) {
            throw createError({
                message: "Token is undefined",
                status: 401
            })
        }
        if(!params) {
            throw createError({
                message: "User id is required in params endpoint",
                status: 400
            })
        }
        const { verifyUserAccess } = useAuth(event)
        await verifyUserAccess(cookie, params.userId)

        const recipeInputData = body.recipeData
        const validateRecipeSchema = uploadRecipeSchema.safeParse(recipeInputData)
        if (validateRecipeSchema.error) {
            throw createError({
                message: validateRecipeSchema.error.message,
                status: 500
            })
        }

        const userRecipeRef = await db.collection(`users/${params?.userId}/user_recipe`).add({ ...recipeInputData })
        await userRecipeRef.update({ id: userRecipeRef.id })

        const publicRecipeSnap = await userRecipeRef.get();
        const publicRecipeData = publicRecipeSnap.data();

        const publicRecipesRef = await db.collection("public_recipes").add({ ...publicRecipeData})
        await publicRecipesRef.update({ publicId: publicRecipesRef.id })

        return {
            success: true,
            message: `Success upload user recipe`,
        }
    } catch (err) {
        console.error(err);
        throw err
    }
})