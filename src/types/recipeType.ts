export interface RecipeInput {
    title: string
    ingredients: string[]
    steps: string[]
    image: string
    serving: number
}


export interface Recipe extends RecipeInput {
    id: string
}

export interface RecipeDetails extends Recipe {
    authorId: string
}