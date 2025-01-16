"use client"
import { Button } from '@/components/ui/button'
import { UserRouter } from '@/router/userRouter'
import { AlertStore } from '@/store/alertStore'
import { UserStore } from '@/store/UserStore'
import { Recipe } from '@/types/recipeType'
import { Bookmark, BookmarkX } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'

type Props = {
    recipe: Recipe
}

export default function SaveRecipeButton({ recipe }: Props) {
    const [savedStatus, setSavedStatus] = useState(false)
    const { setAlert } = AlertStore(useShallow((state) => ({ setAlert: state.setAlert })))
    const { userData } = UserStore(useShallow((state) => ({ userData: state.userData })))
    const { saved_recipe } = userData
    const { deleteUserSavedRecipes, createUserSavedRecipes } = UserRouter
    async function handleIsSaved() {
        if (savedStatus) {
            await deleteUserSavedRecipes(recipe)
            setAlert({
                isShowAlert: true,
                alertTitle: "Deleted From Collection",
                alertDescription: `${recipe.title} deleted from saved collection`
            })
        } else {
            await createUserSavedRecipes(recipe)
            setAlert({
                isShowAlert: true,
                alertTitle: "Add To Collection",
                alertDescription: `${recipe.title} added to saved collection`
            })
        }
    }

    useEffect(() => {
        if (saved_recipe) {
            const status = saved_recipe.some((saved: Recipe) => saved.id == recipe.id)
            setSavedStatus(status)
        }
    }, [recipe.id, saved_recipe])
    return (
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
    )
}
