"use client"
import { House, Plus } from 'lucide-react'
import NavigationItem from './NavigationItem'
import AuthButton from '../auth/AuthButton'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const ignoreSidebar = ["/signIn", "/signUp"]
  const pathname = usePathname()
  if (ignoreSidebar.some((path: string) => path == pathname)) {
    return null
  }

  return (
    <section className='fixed left-0 h-[100svh] w-56 pt-24 flex flex-col gap-3 items-center px-7'>
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
      <AuthButton />
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
    text: "Create Recipe",
    url: "/new-post",
    icon: <Plus />
  },
]