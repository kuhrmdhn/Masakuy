"use client"
import RecipeCard from '@/components/element/recipe_list/RecipeCard'
import { publicRecipeRouter } from '@/router/publicRecipeRouter'
import { searchResultStore } from '@/store/searchResultStore'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'

export default function SearchResultPage() {
    const { getRecipeByName } = publicRecipeRouter
    const { searchResultRecipe, setSearchResultRecipe } = searchResultStore(useShallow((state) => ({
        searchResultRecipe: state.searchResultRecipe,
        setSearchResultRecipe: state.setSearchResultRecipe
    })))
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const queryParams = params.get("keyword")

    const handleSearchRecipe = useCallback(async () => {
        if (queryParams) {
            const keyword = queryParams.toString()
            const recipes = await getRecipeByName(keyword)
            setSearchResultRecipe(recipes)
        }
    }, [queryParams, getRecipeByName, setSearchResultRecipe])
    useEffect(() => {
        handleSearchRecipe()
    }, [handleSearchRecipe])
    return (
        <div>
            {
                searchResultRecipe.map((recipe, index) => (
                    <RecipeCard
                        key={index}
                        recipe={recipe}
                        isPublic={true}
                    />
                ))
            }
        </div>
    )
}
