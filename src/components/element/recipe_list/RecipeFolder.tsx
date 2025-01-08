"use client"
import { getUserData } from '@/router/userRouter'
import { UserStore } from '@/store/UserStore'
import { useCallback, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import RecipeListPage from './RecipeListPage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function RecipeFolder() {
    const { userData } = UserStore(useShallow((state) => ({ userData: state.userData })))
    const { recipe_created, saved_recipe } = userData
    const fetchUserData = useCallback(async () => {
        if (!userData) {
            await getUserData()
        }
    }, [userData])
    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const tabContents = [
        {
            trigger: "postedRecipe",
            recipes: recipe_created,
            isPublic: false
        },
        {
            trigger: "savedRecipe",
            recipes: saved_recipe,
            isPublic: true
        }
    ]

    return (
        <Tabs defaultValue="postedRecipe" className="w-full h-full overflow-auto scrollbar-small scrollbar-main">
            <TabsList className="w-full h-fit flex gap-3 justify-center items-center bg-transparent">
                <TabsTrigger value="postedRecipe">Posted Recipe</TabsTrigger>
                <TabsTrigger value="savedRecipe">Saved Recipe</TabsTrigger>
            </TabsList>
            {
                tabContents.map((content, index) => (
                    <TabsContent className="block" value={content.trigger} key={index}>
                        {content.recipes && <RecipeListPage isPublic={content.isPublic} recipes={content.recipes} />}
                    </TabsContent>
                ))
            }
        </Tabs>
    )
}
