import React from 'react'

export default function Recipe({ params }: { params: { recipeId: string }}) {
    const recipeId = params.recipeId
    return (
        <div>
            {recipeId}
        </div>
    )
}
