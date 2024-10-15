"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { UserRouter } from '@/router/userRouter'
import { UserStore } from '@/store/UserStore'
import { Recipe } from '@/types/recipeType'
import { Bookmark, BookmarkX, Ellipsis } from "lucide-react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useShallow } from 'zustand/react/shallow'
import RecipeInfo from './RecipeInfo'
import { useEffect, useState } from 'react'

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
            <CardImage image={image} isPublic={isPublic} recipeId={id} />
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
        <div className="w-full h-1/2 relative rounded-t-lg duration-300 bg-[#F5F5F5] m-auto shadow-lg overflow-hidden transition-all duration-400 ease-[cubic-bezier(1,0.4,0.4,1)]">
            <div
                className="relative w-full h-full bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(252,252,252,0)_50%,rgba(246,246,246,1)_90%)] bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
            >
                <div className="absolute -bottom-[5%] left-0 right-0 h-[25%] bg-gradient-to-t from-gray-200 to-transparent"></div>
            </div>
            {
                !isPublic &&
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className='absolute top-2 right-2 text-primary-app cursor-pointer'>
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