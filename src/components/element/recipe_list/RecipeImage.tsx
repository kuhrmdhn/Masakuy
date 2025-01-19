"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserRouter } from "@/router/userRouter"
import { Ellipsis } from "lucide-react"
import { useRouter } from "next/navigation"

type Props = {
    image: string
    isPublic: boolean
    recipeId: string
}
export default function RecipeImage({ image, isPublic, recipeId }: Props) {
    const { deleteUserRecipes } = UserRouter
    const { push } = useRouter()
    function handleEditRecipe() {
        push(`/profile/edit-recipe/${recipeId}`)
    }
    function handleDeleteRecipe() {
        deleteUserRecipes(recipeId)
    }
    return (
        <div className="w-full h-2/5 lg:h-1/2 relative rounded-t-lg duration-300 bg-[#F5F5F5] m-auto shadow-lg overflow-hidden transition-all duration-400 ease-in-out">
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