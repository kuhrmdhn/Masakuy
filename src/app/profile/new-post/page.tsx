"use client"
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { uploadRecipeImage } from '@/router/bucketStorage'
import { UserRouter } from '@/router/userRouter'
import { RecipeInput } from '@/types/recipeType'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function NewPostPage() {
  const { push } = useRouter()
  const { createUserRecipes } = UserRouter
  const [recipeImage, setRecipeImage] = useState<File | null>(null)
  const [ingredients, setIngredients] = useState<string[]>([])
  const [formState, setFormState] = useState({
    title: "",
    steps: "",
    image: "",
    ingredients: ""
  })
  function addIngredients(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const newIngredients = formState.ingredients
    setIngredients((state) => [...state, newIngredients])
    setFormState((state) => ({ ...state, ingredients: "" }))
  }
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.preventDefault()
    const { name, type, value } = e.target
    let inputValue: string | File = value
    if (type == "file") {
      const inputElement = e.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0]
        const previewImageUrl = URL.createObjectURL(file)
        inputValue = previewImageUrl
        setRecipeImage(file)
      }
    }
    setFormState((state) => ({ ...state, [name]: inputValue }))
  }
  async function handleSubmit(e: React.FormEvent<HTMLButtonElement | HTMLFormElement>) {
    e.preventDefault()
    if (recipeImage) {
      const imageUrl = await uploadRecipeImage(recipeImage)
      const dataToPost: RecipeInput = {
        title: formState.title,
        steps: formState.steps,
        ingredients: ingredients,
        image: imageUrl
      }
      await createUserRecipes(dataToPost)
      alert("submited!")
      push("/profile")
    }
  }

  function removeIngredient(ingredient: string) {
    const ingredientIndex = ingredients.indexOf(ingredient)
    const updatedIngredients = [...ingredients]
    updatedIngredients.splice(ingredientIndex, 1)
    setIngredients(updatedIngredients)
    alert("deleted")
  }

  return (
    <section className='w-full h-full flex justify-center items-center'>
      <form className='h-full w-5/6 lg:w-3/5 flex flex-col gap-8'>
        <Input
          value={formState.title}
          onChange={(e) => handleOnChange(e)}
          name="title"
          placeholder='Title'
        />
        <section className='flex flex-col border'>
          <Input
            className="border-none"
            accept='image/*'
            name="image"
            type='file'
            placeholder="Image"
            onChange={(e) => handleOnChange(e)}
          />
          {
            recipeImage && <Image src={formState.image} alt="Recipe Image" height={100} width={100} className='w-56 aspect-square self-center justify-self-center' />
          }
        </section>
        <section className='h-[250px] w-full flex flex-col-reverse justify-between border rounded-lg'>
          <div className="h-[80%] w-full flex flex-col justify-between pl-3">
            <h2>Ingredients List:</h2>
            <ol className="flex flex-col gap-5 overflow-y-auto h-[80%] w-full list-decimal">
              {
                ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient}
                    <button type="button" onClick={() => removeIngredient(ingredient)}>Delete</button>
                  </li>
                ))
              }
            </ol>
          </div>
          <div className='relative'>
            <Input
              value={formState.ingredients}
              onChange={(e) => handleOnChange(e)}
              name='ingredients'
              placeholder='Ingredients'
            />
            <Button className='absolute right-0 top-0 h-full bg-primary-app' onClick={(e) => addIngredients(e)}>Add Ingredients</Button>
          </div>
        </section>
        <section>
          <Label htmlFor='stepsInput'>Steps</Label>
          <Textarea
            id="stepsInput"
            placeholder='Steps'
            name="steps"
            value={formState.steps}
            onChange={(e) => handleOnChange(e)}
          />
        </section>
        <Button className='w-fit bg-primary-app' onClick={(e) => handleSubmit(e)} type='submit'>Add Recipe</Button>
      </form>
    </section>
  )
}
