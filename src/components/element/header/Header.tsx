"use client"
import NavbarToggle from '@/components/ui/navbar-toggle'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Logo from './Logo'
import SearchBar from './SearchBar'

type Props = {
    className?: string
}

export default function Header({ className, ...props }: Props) {
    const [searchBarVisible, setSearchBarVisible] = useState(true)
    const pathname = usePathname()
    const ignoreNavbarPage = ["/signIn", "/signUp"]
    useEffect(() => {
        if (ignoreNavbarPage.some((path: string) => pathname == path)) {
            setSearchBarVisible(false)
        }
    }, [])
    return (
        <header className={`h-16 w-full fixed top-0 z-50 flex justify-start lg:justify-between items-center gap-10 sm:gap-0 pl-3 sm:pl-7 lg:px-7 bg-white ${className}`} {...props}>
            <section className='w-fit sm:w-1/3 flex items-center gap-2'>
                <NavbarToggle/>
                <div>
                    <Logo />
                </div>
            </section>
            {
                searchBarVisible &&
                <div className="w-1/3 sm:w-2/5">
                    <SearchBar />
                </div>
            }
        </header>
    )
}
