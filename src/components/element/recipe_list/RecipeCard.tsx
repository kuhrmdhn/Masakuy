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
    index?: number
}

export default function RecipeCard({ recipe, isPublic = false, index = 0 }: Props) {
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
        <section
            className={`w-[170px] sm:w-[180px] lg:w-[280px] h-[240px] lg:h-[360px] bg-white rounded-lg border shadow-xl hover:shadow-lg duration-300 text-sm opacity-0 animate-rise-up`}
            style={{
                animationDelay: `${index * .1}s`
            }}
        >
            <RecipeImage image={image} isPublic={isPublic} recipeId={id} />
            <div className='flex flex-col w-full p-3 h-3/5 lg:h-1/2 items-center justify-evenly text-xs lg:text-sm'>
                <div className="flex flex-col w-full h-1/5 justify-between">
                    <h1 className='font-bold text-gray-700 text-ellipsis overflow-hidden whitespace-nowrap'>{title}</h1>
                    <hr />
                </div>
                <RecipeInfo recipe={recipe} />
                <div className="flex justify-around items-center w-full">
                    <Link href={recipeUrl}>
                        <Button
                            size={"xs"}
                            className="flex justify-center items-center text-2xs lg:text-sm sm:h-10 sm:px-4 sm:py-3"
                            variant={"main"}
                        >
                            Start Cooking
                        </Button>
                    </Link>
                    <Button
                        variant={"link"}
                        onClick={handleIsSaved}
                    >
                        {
                            savedStatus ?
                                <BookmarkX className='w-4 lg:w-5 h-4 lg:h-5' /> :
                                <Bookmark className='w-4 lg:w-5 h-4 lg:h-5' />
                        }
                    </Button>
                </div>
            </div>
        </section>
    )
}