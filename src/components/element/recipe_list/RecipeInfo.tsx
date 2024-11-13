import { Recipe } from "@/types/recipeType"
import { BookOpen, CookingPot, User } from "lucide-react"

type Props = {
    recipe: Recipe
    className?: string
}
export default function RecipeInfo({ recipe, className }: Props) {
    const { serving, ingredients, steps } = recipe

    const recipeInfoData = [
        {
            title: "Serving",
            icon: <User className='text-gray-700 h-4 lg:h-5 w-4 lg:w-5' />,
            detail: serving
        },
        {
            title: "Ingredient(s)",
            icon: <BookOpen className='text-gray-700 h-4 lg:h-5 w-4 lg:w-5' />,
            detail: ingredients.length
        },
        {
            title: "Step(s)",
            icon: <CookingPot className='text-gray-700 h-4 lg:h-5 w-4 lg:w-5' />,
            detail: steps.length
        },
    ]
    return (
        <ul className={`w-full h-1/3 lg:h-2/5 flex justify-around lg:justify-between items-center ${className}`}>
            {
                recipeInfoData.map((info, index: number) => (
                    <li key={index} className='flex flex-col text-2xs lg:text-sm'>
                        <h3 className="font-extrabold text-primary-app flex items-center gap-2">
                            {info.icon}
                            {info.detail}
                        </h3>
                        <h4 className="font-light text-black">{info.title}</h4>
                    </li>
                ))
            }
        </ul>
    )
}