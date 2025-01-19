"use client"
import EmptyRecipeList from '@/components/element/recipe_list/EmptyRecipeList'
import RecipeListPage from '@/components/element/recipe_list/RecipeListPage'
import { publicRecipeRouter } from '@/router/publicRecipeRouter'
import { searchResultStore } from '@/store/searchResultStore'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useCallback, useEffect } from 'react'
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
        <Suspense>
            {
                searchResultRecipe.length === 0 ?
                    <EmptyRecipeList />
                    :
                    <RecipeListPage
                        recipes={searchResultRecipe}
                    />
            }
        </Suspense>
    )
}
