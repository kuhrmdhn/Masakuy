export const useRecipeUtilityInput = defineStore("recipe-utility-input", () => {
    const style = reactive({ ingredientsInput: "right-0", stepsInput: "-right-full" })
    function showIngredientsInput() {
        return Object.assign(style, { ingredientsInput: "right-0", stepsInput: "-right-full" })
    }
    function showStepsInput() {
        return Object.assign(style, { ingredientsInput: "-right-full", stepsInput: "right-0" })
    }

    return { style, showIngredientsInput, showStepsInput }
})