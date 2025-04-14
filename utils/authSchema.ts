import { z } from "zod"
export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Kata sandi minimal 8 karakter")
}).required()