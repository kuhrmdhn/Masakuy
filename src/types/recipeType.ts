export interface RecipeInput {
    title: string
    ingredients: string[]
    steps: RecipeStep[]
}


export interface Recipe extends RecipeInput {
    id: string
    public_id: string
}


type RecipeStep = {
    name: string
    description: string
}