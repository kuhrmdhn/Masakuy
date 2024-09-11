import React from 'react'

export default function useFormatRecipeStep() {
    function formatRecipeStep(steps: string) {
        return steps.split("\n")
    }
    function recipeStepLength(steps: string) {
        const step = formatRecipeStep(steps)
        return step.length
    }
    return { formatRecipeStep, recipeStepLength }
}
