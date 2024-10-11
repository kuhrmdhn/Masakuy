"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs'
import { UserStore } from '@/store/UserStore'
import { getUserData } from '@/router/userRouter'
import { publicRecipeRouter } from '@/router/publicRecipeRouter'
import { useShallow } from 'zustand/react/shallow'
import RecipeListPage from './RecipeListPage'
import { Recipe } from '@/types/recipeType'

export default function RecipeFolder() {
    const [savedRecipe, setSavedRecipe] = useState<Recipe[]>([])
    const { userData } = UserStore(useShallow((state) => ({ userData: state.userData })))
    const { recipe_created, saved_recipe } = userData
    const { getRecipeById } = publicRecipeRouter

    const fetchUserData = useCallback(async () => {
        if (!userData) {
            await getUserData()
        }
    }, [userData])

    const fetchSavedRecipe = useCallback(async () => {
        if (!saved_recipe || saved_recipe.length === 0) {
            return
        }
        try {
            const savedRecipes = saved_recipe.map(async (recipeId: string) => {
                return await getRecipeById(recipeId);
            })
        } catch (error) {
            console.error('Error fetching saved recipes:', error);
        }
    }, [getRecipeById, saved_recipe]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    useEffect(() => {
        if (saved_recipe && saved_recipe.length > 0) {
            fetchSavedRecipe();
        }
    }, [fetchSavedRecipe, saved_recipe]);

    return (
        <section className='w-full h-full pt-5'>
            <h1>Hello World</h1>
            {recipe_created && <RecipeListPage recipes={recipe_created} isPublic={false} />}
        </section>
    )
}
