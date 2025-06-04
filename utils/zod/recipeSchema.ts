import { z } from "zod";

export const postRecipeSchema = z.object({
    authorId: z.string(),
    title: z.string().min(1, "Title of recipe at least 1 character"),
    description: z.string().optional(),
    ingredients: z.array(z.string()).min(1, "Should have min. 1 ingredient"),
    steps: z.array(z.string()).min(1, "At least have 1 cooking step"),
    image: z.string(),
    serving: z.number().min(1, "Minimum serving is 1")
})

export const recipeSchema = postRecipeSchema.extend({ id: z.string() })

export type PostRecipe = z.infer<typeof postRecipeSchema>
export type Recipe = z.infer<typeof recipeSchema>