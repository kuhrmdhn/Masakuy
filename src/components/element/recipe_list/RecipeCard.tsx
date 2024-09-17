"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import useFormatRecipeStep from '@/hooks/useFormatRecipeStep'
import { UserRouter } from '@/router/userRouter'
import { UserStore } from '@/store/UserStore'
import { Recipe } from '@/types/recipeType'
import { Bookmark, BookmarkMinus, BookOpen, CookingPot, Ellipsis, User } from "lucide-react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

type Props = {
    recipe: Recipe,
    isPublic?: boolean
}

export default function RecipeCard({ recipe, isPublic = false }: Props) {
    const { id, title, serving, image, ingredients, steps } = recipe
    const { userData } = UserStore(useShallow((state) => ({ userData: state.userData })))
    const { saved_recipe } = userData
    const { recipeStepLength } = useFormatRecipeStep()
    const { deleteUserSavedRecipes, createUserSavedRecipes } = UserRouter
    function handleIsSaved() {
        const status = saved_recipe?.includes(id)
        if (status) {
            deleteUserSavedRecipes(id)
        } else {
            createUserSavedRecipes(id)
        }
    }
    const recipeInfoData = [
        {
            title: "Serving",
            icon: <User className='text-gray-700' />,
            detail: serving
        },
        {
            title: "Ingredient(s)",
            icon: <BookOpen className='text-gray-700' />,
            detail: ingredients.length
        },
        {
            title: "Step(s)",
            icon: <CookingPot className='text-gray-700' />,
            detail: recipeStepLength(steps)
        },
    ]

    const recipeUrl = `recipe/${id}`

    return (
        <section className='w-[320px] h-[400px] bg-white rounded-lg border shadow-xl hover:shadow-lg duration-300'>
            <CardImage image={image} isPublic={isPublic} recipeId={id} />
            <div className='flex flex-col w-full p-3 h-1/2 items-center justify-evenly'>
                <div className="flex flex-col w-full h-1/5 justify-between">
                    <h1 className='font-bold text-gray-700 text-ellipsis overflow-hidden whitespace-nowrap'>{title}</h1>
                    <hr />
                </div>
                <ul className='w-full h-2/5 flex justify-between items-center'>
                    {
                        recipeInfoData.map((info, index: number) => (
                            <li key={index} className='flex flex-col'>
                                <h3 className="font-extrabold text-primary-app flex items-center gap-2">
                                    {info.icon}
                                    {info.detail}
                                </h3>
                                <h4 className="font-light text-black">{info.title}</h4>
                            </li>
                        ))
                    }
                </ul>
                <div className="flex justify-around items-center w-full">
                    <Link className="bg-primary-app text-white w-5/6 py-2 flex justify-center items-center rounded-md" href={recipeUrl}>View Recipe</Link>
                    <Button variant={"link"} onClick={handleIsSaved}>
                        {
                            saved_recipe?.includes(id) ? <BookmarkMinus /> : <Bookmark />
                        }
                    </Button>
                </div>
            </div>
        </section>
    )
}

type CardImageProps = {
    image: string
    isPublic: boolean
    recipeId: string
}
function CardImage({ image, isPublic, recipeId }: CardImageProps) {
    const { deleteUserRecipes } = UserRouter
    const { push } = useRouter()
    function handleEditRecipe() {
        push(`/profile/edit-recipe/${recipeId}`)
    }
    function handleDeleteRecipe() {
        deleteUserRecipes(recipeId)
    }
    return (
        <div className="w-[320px] h-[200px] relative rounded-t-lg duration-300 bg-[#F5F5F5] m-auto shadow-lg overflow-hidden transition-all duration-400 ease-[cubic-bezier(1,0.4,0.4,1)]">
            <div
                className="relative w-full h-full bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(252,252,252,0)_50%,rgba(246,246,246,1)_90%)] bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="absolute -bottom-[5%] left-0 right-0 h-[25%] bg-gradient-to-t from-gray-200 to-transparent"></div>
            </div>
            {
                !isPublic &&
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='absolute top-2 right-2 text-white cursor-pointer'>
                        <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={handleEditRecipe}>
                                <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleDeleteRecipe}>
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            }
        </div>
    )
}