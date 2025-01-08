"use client"
import { House, Plus } from 'lucide-react'
import NavigationItem from './NavigationItem'
import AuthenticateButton from '../auth/AuthenticateButton'
import { usePathname } from 'next/navigation'
import { NavbarStore } from '@/store/navbarStore'
import { useShallow } from 'zustand/react/shallow'
import NavbarToggle from '@/components/ui/navbar-toggle'
import Logo from '../header/Logo'

export default function Sidebar() {
  const { navbarShow } = NavbarStore(useShallow((state) => ({
    navbarShow: state.navbarShow
  })))
  const ignoreSidebar = ["/signIn", "/signUp"]
  const pathname = usePathname()
  if (ignoreSidebar.some((path: string) => path == pathname)) {
    return null
  }

  return (
    <section className={`fixed z-[99] ${navbarShow ? "left-0" : "-left-full"} duration-500 sm:left-0 h-[100svh] w-44 sm:w-40 lg:w-52 bg-white pt-24 flex flex-col gap-3 items-center px-7`}>
      <span className='absolute top-5 left-3 flex gap-5'>
        <NavbarToggle />
        <Logo/>
      </span>
      {
        navigationData.map((navigation, index) => (
          <NavigationItem
            key={index}
            icon={navigation.icon}
            url={navigation.url}
            text={navigation.text}
          />
        ))
      }
      <AuthenticateButton />
    </section>
  )
}

const navigationData = [
  {
    text: "Home",
    url: "/",
    icon: <House />
  },
  {
    text: "Post",
    url: "/new-post",
    icon: <Plus />
  },
]