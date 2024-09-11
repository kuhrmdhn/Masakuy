"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { publicRecipeRouter } from '@/router/publicRecipeRouter'
import { RecipeDetails } from '@/types/recipeType'
import RecipeCard from './RecipeCard'

export default function PublicRecipe() {
    const [publicRecipes, setPublicRecipes] = useState<RecipeDetails[]>([])
    const { getPublicRecipe } = publicRecipeRouter
    const fetchPublicRecipe = useCallback(async () => {
        const publicRecipes: RecipeDetails[] = await getPublicRecipe()
        setPublicRecipes(publicRecipes)
    }, [getPublicRecipe])
    useEffect(() => {
        fetchPublicRecipe()
    }, [fetchPublicRecipe])

    return (
        <section>
            {
                publicRecipes && publicRecipes.map((recipe: RecipeDetails, index: number) => {
                    const { authorId, ...recipeData } = recipe
                    return (
                        <RecipeCard
                            key={index}
                            recipe={recipeData}
                            authorId={authorId}
                            isPublic={true}
                        />
                    )
                }
                )
            }
        </section>
    )
}
