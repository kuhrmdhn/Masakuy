import RecipePage from '@/components/element/recipe_list/RecipePage'
import { publicRecipeRouter } from '@/router/publicRecipeRouter'
import { UserRouter } from '@/router/userRouter'
import { RecipeDetails } from '@/types/recipeType'

type Props = {
    params: Promise<{ recipeId: string }>
}

export default async function Recipe({ params }: Props) {
    const recipeId = (await params).recipeId
    const { getUserById } = UserRouter
    const { getRecipeById } = publicRecipeRouter
    const recipe = await getRecipeById(recipeId)
    if (!recipe) {
        throw new Error("Recipe not found")
    }
    const { username: author } = await getUserById(recipe.authorId)
    return (
        <div className='w-full h-max flex justify-end'>
            <RecipePage author={author} recipe={recipe as RecipeDetails} />
        </div>
    )
}
