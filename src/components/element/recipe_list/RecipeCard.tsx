"use client"
import { Recipe } from '@/types/recipeType'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserRouter } from '@/router/userRouter'
import { ArrowUpRight, Ellipsis } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { publicRecipeRouter } from '@/router/publicRecipeRouter'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import useFormatRecipeStep from '@/hooks/useFormatRecipeStep'

type Props = {
    recipe: Recipe,
    authorId?: string
    isPublic?: boolean
}

export default function RecipeCard({ recipe, authorId, isPublic = false }: Props) {
    const { id, title, image, ingredients, steps } = recipe
    const { recipeStepLength } = useFormatRecipeStep()
    const [author, setAuthor] = useState("")
    const { getUserById } = UserRouter
    const fetchAuthor = useCallback(async () => {
        if (authorId) {
            const data = await getUserById(authorId)
            setAuthor(data)
        }
    }, [getUserById, authorId])

    useEffect(() => {
        fetchAuthor()
    }, [fetchAuthor])

    const recipeInfoData = [
        {
            title: author && "Author",
            data: author
        },
        {
            title: "Ingredient(s)",
            data: ingredients.length
        },
        {
            title: "Step(s)",
            data: recipeStepLength(steps)
        },
    ]

    const recipeUrl = `recipe/${id}`

    return (
        <section className='w-[320px] h-[380px] bg-gray-200 rounded-lg'>
            <CardImage image={image} isPublic={isPublic} recipeId={id} />
            <div className='p-5 flex flex-col gap-5'>
                <h1 className='font-extrabold text-primary-app text-ellipsis overflow-hidden whitespace-nowrap'>{title}</h1>
                <ul className='w-full h-full flex justify-between'>
                    {
                        recipeInfoData.map((info, index: number) => (
                            <li key={index} className='flex flex-col'>
                                <h4 className="font-semibold text-gray-400">{info.title}</h4>
                                <h5 className="font-bold text-primary-app">{info.data}</h5>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="flex justify-end items-end w-full px-5">
                <Link className="bg-primary-app text-white px-3 py-2 flex gap-3 rounded-md" href={recipeUrl}>Visit <ArrowUpRight /></Link>
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
                className="relative overflow-y-hidden w-full h-full bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(252,252,252,0)_50%,rgba(246,246,246,1)_90%)] bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="absolute duration-500 -bottom-[5%] left-0 right-0 h-[25%] bg-gradient-to-t from-gray-200 to-transparent"></div>
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