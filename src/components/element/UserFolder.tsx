"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { UserStore } from '@/store/UserStore'
import { Recipe } from '@/types/recipeType'
import RecipeCard from './RecipeCard'

export default function UserFolder() {
    const { userData } = UserStore()
    const { recipe_created } = userData
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
                <TabsContent value="postedRecipe">
                    {
                        recipe_created && recipe_created.map((recipe: Recipe, index: number) => (
                            <RecipeCard
                                key={index}
                                recipe={recipe}
                                isPublic={false}
                            />
                        ))
                    }
                    {
                        recipe_created && recipe_created.map((recipe: Recipe, index: number) => (
                            <RecipeCard
                                key={index}
                                recipe={recipe}
                                isPublic={false}
                            />
                        ))
                    }
                    {
                        recipe_created && recipe_created.map((recipe: Recipe, index: number) => (
                            <RecipeCard
                                key={index}
                                recipe={recipe}
                                isPublic={false}
                            />
                        ))
                    }
                    {
                        recipe_created && recipe_created.map((recipe: Recipe, index: number) => (
                            <RecipeCard
                                key={index}
                                recipe={recipe}
                                isPublic={false}
                            />
                        ))
                    }
                    {
                        recipe_created && recipe_created.map((recipe: Recipe, index: number) => (
                            <RecipeCard
                                key={index}
                                recipe={recipe}
                                isPublic={false}
                            />
                        ))
                    }
                    {
                        recipe_created && recipe_created.map((recipe: Recipe, index: number) => (
                            <RecipeCard
                                key={index}
                                recipe={recipe}
                                isPublic={false}
                            />
                        ))
                    }
                    {
                        recipe_created && recipe_created.map((recipe: Recipe, index: number) => (
                            <RecipeCard
                                key={index}
                                recipe={recipe}
                                isPublic={false}
                            />
                        ))
                    }
                </TabsContent>
                <TabsContent value='savedRecipe'>
                    {
                        recipe_created && recipe_created.map((recipe: Recipe, index: number) => (
                            <RecipeCard
                                key={index}
                                recipe={recipe}
                                isPublic={false}
                            />
                        ))
                    }
                    {
                        recipe_created && recipe_created.map((recipe: Recipe, index: number) => (
                            <RecipeCard
                                key={index}
                                recipe={recipe}
                                isPublic={false}
                            />
                        ))
                    }                </TabsContent>
            </Tabs>
        </section>
    )
}
