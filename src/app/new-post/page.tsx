"use client";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { initialRecipeInput } from "@/constant/initialRecipeInput";
import { BucketStorage } from "@/router/bucketStorage";
import { UserRouter } from "@/router/userRouter";
import { RecipeInput } from "@/types/recipeType";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

export default function NewRecipePostPage() {
  const inputImageRef = useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [formData, setFormData] = useState(initialRecipeInput);
  const { createUserRecipes } = UserRouter
  const inputData = [
    {
      name: "title",
      placeholder: "Title",
      value: formData.title,
      type: "text",
    },
    {
      name: "serving",
      placeholder: "Total Serving",
      value: formData.serving,
      type: "number",
    },
    {
      name: "image",
      placeholder: "Image",
      value: formData.image,
      type: "file",
    },
  ];

  const inputLists = [
    {
      title: "Ingredient Lists",
      name: "ingredients",
      value: formData.ingredients,
    },
    {
      title: "Step Lists",
      name: "steps",
      value: formData.steps,
    },
  ];

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { value, name, files } = e.target;
    if ((name === "steps" || name === "ingredients") && index !== undefined) {
      const newData = [...formData[name]];
      newData[index] = value;
      setFormData((state) => ({ ...state, [name]: newData }));
    } else if (name === "image" && files && files.length > 0) {
      const previewImageUrl = URL.createObjectURL(files[0])
      setFormData((state) => ({ ...state, "image": previewImageUrl }));
      setPreviewImage(files[0]);
    } else {
      setFormData((state) => ({ ...state, [name]: value }));
    }
  };

  const handleAddArray = (name: string) => {
    if (name === "steps" || name === "ingredients") {
      const newData = [...formData[name], ""];
      setFormData((state) => ({ ...state, [name]: newData }));
    }
  };

  const handleRemoveArray = (index: number, name: string) => {
    if (name === "steps" || name === "ingredients") {
      if (index === 0) {
        const emptyArray = [""]
        setFormData((state) => ({ ...state, [name]: emptyArray }));
      } else {
        const newData = [...formData[name]];
        newData.splice(index, 1)
        setFormData((state) => ({ ...state, [name]: newData }));
      }
    }
  }

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    let imageUrl = ""
    if (previewImage) {
      imageUrl = await BucketStorage.uploadRecipeImage(previewImage)
    }
    try {
      const dataToPost: RecipeInput = { ...formData, image: imageUrl }
      await createUserRecipes(dataToPost)
    } catch (error) {
      console.error(error);
    } finally {
      if (inputImageRef.current) {
        inputImageRef.current.value = "";
      }
      setFormData(initialRecipeInput);
      setPreviewImage(null);
    }
  };

  return (
    <section className="w-full h-full flex flex-col-reverse lg:flex-row items-center justify-evenly">
      <div className="w-4/5 lg:w-1/2 h-[calc(100svh-6rem)] flex flex-col justify-between">
        <form className="w-full h-max flex flex-col gap-7 scrollbar-main scrollbar-small overflow-auto pl-3 pr-5 pt-7">
          {
            inputData.map((data) => (
              <Input
                key={data.name}
                type={data.type}
                name={data.name}
                placeholder={data.placeholder}
                onChange={(e) => handleOnChange(e)}
                value={data.type === "file" ? undefined : data.value}
                accept={data.name === "image" ? "image/*" : undefined}
                ref={data.type === "file" ? inputImageRef : undefined}
              />
            ))
          }
          {
            inputLists.map((input) => (
              <div key={input.name} className="w-full">
                <h1>{input.title}</h1>
                {
                  Array.isArray(input.value) && input.value.map((value, index) => (
                    <section key={index} className="relative z-10">
                      <span className="z-20 absolute left-4 bottom-1/2 translate-y-1/2">{index + 1}.</span>
                      <Input
                        withLabel={false}
                        className="w-full px-10 placeholder-primary-app"
                        name={input.name}
                        value={value}
                        onChange={(e) => handleOnChange(e, index)}
                      />
                      <Button
                        onClick={() => handleRemoveArray(index, input.name)}
                        type="button"
                        variant={"destructive"}
                        className="h-fit w-fit p-1 z-20 absolute right-4 bottom-1/2 translate-y-1/2"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </section>
                  ))
                }
                <Button
                  key={`add-${input.name}`}
                  className="h-fit w-fit mt-2 p-2 flex gap-2 items-center bg-primary-app hover:bg-primary-app/75"
                  onClick={() => handleAddArray(input.name)}
                  type="button"
                >
                  <Plus className="w-3 h-3" /> Add {input.name}
                </Button>
              </div>
            ))
          }
        </form >
        <Button onClick={(e) => handleSubmit(e)} className="w-fit self-end flex gap-2 items-center bg-primary-app hover:bg-primary-app/75">Submit</Button>
      </div>
      <Image
        priority
        src={formData.image}
        alt="Preview Recipe Image"
        height={600}
        width={600}
        className="h-44 lg:h-72 w-auto aspect-square object-cover object-center rounded-md"
      />
    </section>
  );
}
