import { z } from "zod";

export const uploadRecipeFormSchema = z.object({
    image: z.string(),
    ingredients: z.array(z.string()),
    serving: z.number(),
    steps: z.array(z.string()),
    title: z.string()
})

export const uploadRecipeSchema = uploadRecipeFormSchema.extend({  
    authorId: z.string()
})

export const recipeSchema = uploadRecipeFormSchema.extend({
    id: z.string()
})

export type Recipe = z.infer<typeof recipeSchema>
export type UploadRecipeForm = z.infer<typeof uploadRecipeFormSchema>