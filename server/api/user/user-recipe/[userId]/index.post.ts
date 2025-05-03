import { uploadRecipeSchema } from "~/utils/zod/recipeSchema"

export default defineEventHandler(async (event) => {
    try {
        const { verifyUserAccess } = useAuth(event)
        await verifyUserAccess

        const body = await readBody(event)
        const uploadRecipeData = body.recipeData
        const validate = uploadRecipeSchema.safeParse(uploadRecipeData)
        if (validate.error) {
            throw createError({
                message: validate.error.message,
                status: 500
            })
        }
        const params = event.context.params
        const { db } = useDb(event)
        const newDocRef = await db.collection(`users/${params?.userId}/user_recipe`).add({ ...uploadRecipeData })
        await newDocRef.update({ id: newDocRef.id })

        return {
            success: true,
            message: `Success upload user recipe`,
        }
    } catch (err) {
        console.error(err);
        throw err
    }
})