"use client"
import { Button } from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function SearchBar() {
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const queryParams = params.get("keyword")
    const { push } = useRouter()
    const inputRef = useRef<HTMLInputElement | null>(null)
    const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (inputRef.current) {
            const keyword = inputRef.current.value.toString()
            if (keyword.trim() !== "") {
                return push(`/search?keyword=${keyword}`)
            }
        }
    }
    useEffect(() => {
        if (queryParams && inputRef.current) {
            inputRef.current.defaultValue = queryParams
        }
    }, [queryParams])
    return (
        <form onSubmit={onSearch} className="flex sm:gap-3 w-fit items-center">
            <Input ref={inputRef} className='placeholder-slate-400 h-10 w-36 sm:w-80' withLabel={false} placeholder='Search recipe' />
            <Button className="bg-primary-app hover:bg-primary-app/80 sm:w-fit" type="submit">
                <Search className='h-4 w-4' />
            </Button>
        </form>
    )
}
