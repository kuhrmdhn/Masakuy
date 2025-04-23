import { z } from "zod";

export const recipeSchema = z.object({
    authorId: z.string(),
    id: z.string(),
    image: z.string(),
    ingredients: z.array(z.string()),
    serving: z.number(),
    steps: z.array(z.string()),
    title: z.string()
})

export type Recipe = z.infer<typeof recipeSchema>