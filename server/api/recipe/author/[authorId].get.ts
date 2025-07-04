export default defineEventHandler(async (event) => {
    try {
        const { db } = useFirebase(event)
        const param = event.context.params
        if (!param) {
            throw createError({
                statusCode: 400,
                statusMessage: "Missing Params",
                message: "Author id is missing in params",
                cause: "Missing author id in params"
            })
        }
        const authorId = param.authorId
        if (!authorId) {
            throw createError({
                statusCode: 400,
                statusMessage: "Missing author id in query",
                message: "Author id is required, but receive is undefined",
                cause: "Author id is not define"
            })
        }

        const authorSnap = await db.doc(`users/${authorId}`).get()
        if (!authorSnap.exists) {
            throw createError({
                statusCode: 404,
                message: `Author with id ${authorId} is not found`,
                statusMessage: "Not Found: Cant find author",
                cause: "Author id is invalid"
            })
        }

        const author = authorSnap.data()
        if (!author || !author.username) {
            throw createError({
                statusCode: 500,
                message: "Author data is missing 'username' fields",
                statusMessage: "Author data incomplete",
                cause: "Incomplete fields"
            })
        }

        return {
            success: true,
            message: "Success get recipe author username",
            data: author.username
        }
    } catch (err: any) {
        const { message, cause } = err as Error
        throw createError({
            statusCode: 500,
            statusMessage: "Internal server error",
            message,
            cause
        })
    }
})