"use client"
import { Button } from '@/components/ui/button'
import { UserRouter } from '@/router/userRouter'
import { UserStore } from '@/store/UserStore'
import { Recipe } from '@/types/recipeType'
import { Bookmark, BookmarkX } from "lucide-react"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import RecipeImage from './RecipeImage'
import RecipeInfo from './RecipeInfo'

type Props = {
    recipe: Recipe,
    isPublic?: boolean
}

export default function RecipeCard({ recipe, isPublic = false }: Props) {
    const [savedStatus, setSavedStatus] = useState(false)
    const { id, title, image } = recipe
    const recipeUrl = `recipe/${id}`
    const { userData } = UserStore(useShallow((state) => ({ userData: state.userData })))
    const { saved_recipe } = userData
    const { deleteUserSavedRecipes, createUserSavedRecipes } = UserRouter
    function handleIsSaved() {
        if (savedStatus) {
            deleteUserSavedRecipes(recipe)
        } else {
            createUserSavedRecipes(recipe)
        }
    }

    useEffect(() => {
        if (saved_recipe) {
            const status = saved_recipe.some((saved) => saved.id == id)
            setSavedStatus(status)
        }
    }, [id, saved_recipe])

    return (
        <section className='w-[260px] h-[320px] bg-white rounded-lg border shadow-xl hover:shadow-lg duration-300 text-sm'>
            <RecipeImage image={image} isPublic={isPublic} recipeId={id} />
            <div className='flex flex-col w-full p-3 h-1/2 items-center justify-evenly'>
                <div className="flex flex-col w-full h-1/5 justify-between">
                    <h1 className='font-bold text-gray-700 text-ellipsis overflow-hidden whitespace-nowrap'>{title}</h1>
                    <hr />
                </div>
                <RecipeInfo recipe={recipe} />
                <div className="flex justify-around items-center w-full">
                    <Link className="bg-primary-app text-white w-5/6 py-2 flex justify-center items-center rounded-md" href={recipeUrl}>View Recipe</Link>
                    <Button variant={"link"} onClick={handleIsSaved}>
                        {
                            savedStatus ?
                                <BookmarkX className='w-5 h-5' /> :
                                <Bookmark className='w-5 h-5' />
                        }
                    </Button>
                </div>
            </div>
        </section>
    )
}