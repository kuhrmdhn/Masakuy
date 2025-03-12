export const responseDb = (statusCode: number, message: string, data?: any) => {
    return {
        statusCode,
        message,
        data: data ?? null,
    }
}