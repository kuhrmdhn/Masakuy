import { publicRecipeRouter } from '@/router/publicRecipeRouter'
import { RecipeDetails } from '@/types/recipeType'
import React from 'react'
import RecipePage from '@/components/element/recipe_list/RecipePage'
import { UserRouter } from '@/router/userRouter'
import { notFound } from 'next/navigation'


export default async function Recipe({ params }: { params: { recipeId: string } }) {
    const recipeId = params.recipeId
    const { getUserById } = UserRouter
    const { getRecipeById } = publicRecipeRouter
    const recipe = await getRecipeById(recipeId)
    const author = await getUserById(recipe?.authorId)
    if(!recipe) notFound()
    return (
        <div className='w-full h-max flex justify-center'>
            <RecipePage author={author} recipe={recipe as RecipeDetails} />
        </div>
    )
}
