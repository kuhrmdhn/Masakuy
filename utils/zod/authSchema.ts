import { z } from "zod"
export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Kata sandi minimal 8 karakter")
}).required()

export const registerSchema = signInSchema.extend({
    username: z.string().min(3, "Nama pengguna minimal 3 karakter")
})

export type SignInData = z.infer<typeof signInSchema>
export type RegisterData = z.infer<typeof registerSchema>