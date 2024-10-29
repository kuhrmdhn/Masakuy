"use client"
import { House, Plus, UserRound } from 'lucide-react'
import NavigationItem from './NavigationItem'

export default function Sidebar() {
  return (
    <section className='fixed left-0 h-[100svh] w-56 pt-24 flex flex-col gap-3 items-center'>
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
  {
    text: "Profile",
    url: "/profile",
    icon: <UserRound />
  },
]