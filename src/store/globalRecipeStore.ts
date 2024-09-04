import { RecipeInput } from "@/types/recipeType";
import { create } from "zustand";

type Store = {
    recipes: RecipeInput[],
    setRecipes: (params: RecipeInput[]) => void
}

export const GlobalRecipeStore = create<Store>()((set) => ({
    recipes: [],
    setRecipes(recipes) {
        set({ recipes })
    },
}))