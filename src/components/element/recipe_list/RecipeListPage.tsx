import { Recipe } from '@/types/recipeType'
import React from 'react'
import RecipeCard from './RecipeCard'

type Props = {
    recipes: Recipe[]
    isPublic?:boolean
}

export default function RecipeListPage({recipes, isPublic = true}: Props) {
  return (
    <div className='w-full h-full grid justify-items-center gap-y-5 grid-cols-5'>
      {
        recipes.map((recipe, index) => (
            <RecipeCard 
                key={index}
                recipe={recipe}
                isPublic={isPublic}
            />
        ))
      }
      {
        recipes.map((recipe, index) => (
            <RecipeCard 
                key={index}
                recipe={recipe}
                isPublic={isPublic}
            />
        ))
      }
      {
        recipes.map((recipe, index) => (
            <RecipeCard 
                key={index}
                recipe={recipe}
                isPublic={isPublic}
            />
        ))
      }
      {
        recipes.map((recipe, index) => (
            <RecipeCard 
                key={index}
                recipe={recipe}
                isPublic={isPublic}
            />
        ))
      }
      {
        recipes.map((recipe, index) => (
            <RecipeCard 
                key={index}
                recipe={recipe}
                isPublic={isPublic}
            />
        ))
      }
      {
        recipes.map((recipe, index) => (
            <RecipeCard 
                key={index}
                recipe={recipe}
                isPublic={isPublic}
            />
        ))
      }
      {
        recipes.map((recipe, index) => (
            <RecipeCard 
                key={index}
                recipe={recipe}
                isPublic={isPublic}
            />
        ))
      }
    </div>
  )
}
