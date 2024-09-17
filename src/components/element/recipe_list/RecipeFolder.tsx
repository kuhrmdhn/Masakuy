"use client"
import React, { useCallback, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { UserStore } from '@/store/UserStore'
import { Recipe } from '@/types/recipeType'
import RecipeCard from './RecipeCard'
import { getUserData } from '@/router/userRouter'
import { publicRecipeRouter } from '@/router/publicRecipeRouter'
import { useShallow } from 'zustand/react/shallow'

export default function RecipeFolder() {
    const { userData } = UserStore(useShallow((state) => ({ userData: state.userData })))
    const { getRecipeById } = publicRecipeRouter
    const fetchUserData = useCallback(async () => {
        await getUserData()
    }, [])

    useEffect(() => {
        fetchUserData()
    }, [fetchUserData])
    const { recipe_created, saved_recipe } = userData
    return (
        <section className='w-full h-full pt-5'>
            <Tabs defaultValue='postedRecipe' className='h-full w-full flex flex-col items-center'>
                <TabsList className='w-fit mb-4'>
                    <TabsTrigger value="postedRecipe">
                        Posted Recipe
                    </TabsTrigger>
                    <TabsTrigger value="savedRecipe">
                        Saved Recipe
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="postedRecipe" className="grid grid-cols-3 px-5">
                    {
                        recipe_created && recipe_created.map((recipe: Recipe, index: number) => (
                            <RecipeCard
                                key={index}
                                recipe={recipe}
                            />
                        ))
                    }
                </TabsContent>
                <TabsContent value='savedRecipe' className="grid grid-cols-3 px-5">
                    {
                        saved_recipe && saved_recipe.map(async (recipeId: string, index: number) => {
                            const savedRecipes = await getRecipeById(recipeId)
                            return (
                                <RecipeCard
                                    key={index}
                                    recipe={savedRecipes as Recipe}
                                />
                            )
                        })
                    }
                </TabsContent>
            </Tabs>
        </section>
    )
}
