export default defineEventHandler(async (event) => {
    try {
        const param = event.context.params
        if (!param) {
            throw createError({
                statusCode: 400,
                statusMessage: "Bad request",
                cause: "Undefined Params"
            })
        }

        const id = param.id
        const { verifyUserToken } = useToken(event)
        const { db } = useDb(event)
        const { uid } = await verifyUserToken()

        await db.doc(`users/${uid}/user_recipe/${id}`).delete()
        await db.doc(`public_recipes/${id}`).delete()

        return {
            success: true,
            message: `Success delete user recipe`,
        }
    } catch (err) {
        console.error(err);
    }
})