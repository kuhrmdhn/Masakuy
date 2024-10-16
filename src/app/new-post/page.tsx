"use client";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { initialRecipeInput } from "@/constant/initialRecipeInput";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function NewRecipePostPage() {
  const [previewImage, setPreviewImage] = useState("/images/default-image.webp");
  const [formData, setFormData] = useState(initialRecipeInput);

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
      name: "steps",
      value: formData.steps,
    },
    {
      name: "ingredients",
      value: formData.ingredients,
    },
  ];

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { value, name, files } = e.target;
    if ((name === "steps" || name === "ingredients") && index !== undefined) {
      const newData = [...formData[name]];
      newData[index] = value;
      setFormData((state) => ({ ...state, [name]: newData }));
    } else if (name === "image" && files && files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setPreviewImage(url);
      setFormData((state) => ({ ...state, "image": value }));
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
  };

  return (
    <section className="w-full h-full flex items-center justify-evenly">
      <form onSubmit={handleSubmit} className="w-1/2 h-[calc(100svh-6rem)] flex flex-col gap-7 scrollbar-main scrollbar-small overflow-auto pl-3 pr-5 pt-7">
        {
          inputData.map((data) => (
            <Input
              min={1}
              key={data.name}
              type={data.type}
              name={data.name}
              placeholder={data.placeholder}
              value={data.value}
              onChange={(e) => handleOnChange(e)}
              accept={data.name === "image" ? "image/*" : undefined}
            />
          ))
        }
        {
          inputLists.map((input) => (
            <div key={input.name} className="w-full">
              {
                Array.isArray(input.value) && input.value.map((value, index) => (
                  <section key={index} className="relative z-10">
                    <Input
                      withLabel={false}
                      className="w-full pr-10 placeholder-primary-app"
                      name={input.name}
                      value={value}
                      placeholder={`${index + 1}. ${input.name}`}
                      onChange={(e) => handleOnChange(e, index)}
                    />
                    <Button
                      onClick={() => handleRemoveArray(index, input.name)}
                      type="button"
                      variant={"destructive"}
                      className="h-fit w-fit p-1 absolute right-4 bottom-1/2 translate-y-1/2"
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
        <button type="submit">Submit</button>
      </form >
      <Image
        src={previewImage}
        alt="Preview Recipe Image"
        height={600}
        width={600}
        className="h-72 w-72 object-cover object-center"
      />
    </section>
  );
}
