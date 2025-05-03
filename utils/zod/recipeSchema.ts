import { z } from "zod";

export const uploadRecipeSchema = z.object({
    authorId: z.string(),
    image: z.string(),
    ingredients: z.array(z.string()),
    serving: z.number(),
    steps: z.array(z.string()),
    title: z.string()
})

export const recipeSchema = uploadRecipeSchema.extend({
    id: z.string(),
})

export type Recipe = z.infer<typeof recipeSchema>