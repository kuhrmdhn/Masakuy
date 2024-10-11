import { Recipe, RecipeDetails } from "@/types/recipeType";
import { create } from "zustand";

type Store = {
    searchResultRecipe: RecipeDetails[]
    setSearchResultRecipe: (recipes: RecipeDetails[]) => void
}

export const searchResultStore = create<Store>()((set) => ({
    searchResultRecipe: [],
    setSearchResultRecipe(recipes) {
        set({ searchResultRecipe: recipes })
    },
}))