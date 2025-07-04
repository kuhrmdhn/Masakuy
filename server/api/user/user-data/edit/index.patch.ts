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
        const userDocRef = userDoc.ref
        userDocRef.set(updatedUserData, { merge: true })
        return {
            success: true,
            message: "Success Update User Data",
            data: updatedUserData
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