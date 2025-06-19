export type FormData = {
    title: string,
    description?: string,
    authorId: string,
    image: string,
    ingredients: { total: number, unit: string, name: string }[],
    steps: string[],
    serving: number
}

export const useRecipeFormData = defineStore("recipe-form-data", () => {
    const initialFormData: FormData = {
        title: "",
        description: "",
        authorId: "",
        image: "/image/image-default.jpeg",
        ingredients: [],
        steps: [],
        serving: 0
    }
    const formData = ref<FormData>(initialFormData)
    function setFormData(newData: Partial<FormData>) {
        formData.value = { ...formData.value, ...newData }
        console.log({ newData })
        localStorage.setItem("recipe-form-data", JSON.stringify({ ...formData.value }))
    }
    function resetFormData() {
        formData.value = initialFormData
        localStorage.removeItem("recipe-form-data")
    }

    return { formData, setFormData, resetFormData }
})