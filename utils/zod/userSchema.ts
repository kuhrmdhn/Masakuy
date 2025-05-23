import { z } from "zod";
import { recipeSchema } from "./recipeSchema";

export const userSchema = z.object({
    id: z.string(),
    username: z.string().min(1, "username at least 1 character").max(20, "max character for username is 20"),
    name: z.string().min(1, "name at least 1 character").max(20, "max character for name is 20"),
    bio: z.string().min(1).max(40, "Bio is max 40 character"),
    photo_profile: z.string().url(),
    user_recipe: z.array(recipeSchema).optional(),
    saved_recipe: z.array(recipeSchema).optional(),
})

export type User = z.infer<typeof userSchema>