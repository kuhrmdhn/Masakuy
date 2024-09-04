"use client"
import { Recipe, RecipeInput } from '@/types/recipeType'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectItem } from '../../ui/select'
import MoreOption from '../../icons/MoreOption'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '../../ui/dialog'
import { useRouter } from 'next/navigation'
import { Button } from '../../ui/button'

type Props = {
    recipe: Recipe,
}

export default function RecipeCard({ recipe }: Props) {
    const { public_id, title, image } = recipe
    const [selectValue, setSelectValue] = useState("")
    const [showDialog, setShowDialog] = useState(false)
    const { push } = useRouter()
    const recipeUrl = `/recipe/${public_id}`
    const selectAction = {
        "delete": () => handleDeleteAction(),
        "edit": () => handleEditAction()
    }
    function handleSelect(e: string) {
        console.log(e)
        const action = selectAction[e as keyof typeof selectAction]
        console.log(action)
        if (action) {
            action()
        }
    }
    function resetSelectValue() {
        setSelectValue("")
    }
    function handleDeleteAction() {
        setShowDialog(true)
        resetSelectValue()
    }
    function handleEditAction() {
        push(`/edit-recipe/${public_id}`)
        resetSelectValue()
    }

    return (
        <section className="w-64 h-60 p-4 bg-white border border-gray-200 rounded-lg shadow">
            <Link href={recipeUrl} className='w-fit h-fit'>
                <div className="h-40">
                    <Image className="rounded-lg h-full w-full aspect-auto" src={image || "/favicon.ico"} alt={title} width={100} height={100} />
                </div>
            </Link>
            <div className="p-5 h-1/5 flex justify-between">
                <h5 className="mb-2 font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                    <Select onValueChange={(e) => handleSelect(e)} value={selectValue}>
                        <SelectTrigger className='w-fit h-fit p-0 bg-transparent border-transparent ring-transparent' withIcon={false}>
                            <MoreOption className="w-5 h-5" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup className='flex flex-col gap-3'>
                                <SelectItem value="delete">
                                    delete
                                </SelectItem>
                                <SelectItem value="edit">
                                    edit
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
            </div>
            <Dialog open={showDialog} onOpenChange={() => setShowDialog(false)}>
                <DialogContent>
                    <DialogHeader>
                        <h3>Are you sure delete {title}?</h3>
                    </DialogHeader>
                    <DialogFooter className="flex gap-3">
                        <Button variant={"ghost"}>Cancel</Button>
                        <Button variant={"destructive"}>Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </section>
    )
}
