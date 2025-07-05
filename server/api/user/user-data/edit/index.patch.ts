import { userSchema } from "../../../../../utils/zod/userSchema"

export default defineEventHandler(async (event) => {
    try {
        const { newData } = await readBody(event)
        const { verifyUserToken } = useToken(event)
        const { db } = useFirebase(event)

        const { uid } = await verifyUserToken()
        const userDoc = await db.doc(`users/${uid}`).get()

        if (!userDoc.exists) {
            throw createError({
                statusCode: 404,
                statusMessage: "Not found",
                message: "User data is not found",
                cause: "User fields is not found"
            })
        }

        const userData = userDoc.data()
        const updatedUserData = { ...userData, ...newData }
        const validateUserSchema = userSchema.safeParse(updatedUserData)
        if(validateUserSchema.error) {
            throw createError({
                statusCode: 400,
                statusMessage: validateUserSchema.error.name,
                message: validateUserSchema.error.message,
                cause: validateUserSchema.error.cause
            })
        }

        if (validateUserSchema.data) {
            const userDocRef = userDoc.ref
            userDocRef.set(validateUserSchema.data, { merge: true })
            return {
                success: true,
                message: "Success Update User Data",
                data: updatedUserData
            }
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