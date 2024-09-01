export interface RecipeInput {
    title: string
    ingredients: string[]
    steps: string
    image: string
}


export interface Recipe extends RecipeInput {
    id: string
    public_id: string
}