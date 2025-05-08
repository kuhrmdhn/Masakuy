import { uploadRecipeSchema } from "~/utils/zod/recipeSchema"

export default defineEventHandler(async (event) => {
    try {
        const token = getCookie(event, "firebase_access_token")
        const body = await readBody(event)
        const { db } = useDb(event)

        if (!token) {
            throw createError({
                message: "Token is undefined",
                status: 401
            })
        }
        const { verifyToken } = useToken(event)
        const { uid } = await verifyToken(token)

        const recipeInputData = body.recipeData
        const validateRecipeSchema = uploadRecipeSchema.safeParse({...recipeInputData, authorId: uid})
        if (validateRecipeSchema.error) {
            throw createError({
                message: validateRecipeSchema.error.message,
                status: 500
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
        console.error(err);
        throw err
    }
})