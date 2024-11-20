import React from 'react'
import { Button } from './button'
import { Menu } from 'lucide-react'
import { NavbarStore } from '@/store/navbarStore'
import { useShallow } from 'zustand/react/shallow'

export default function NavbarToggle() {
    const { toggleNavbarShow } = NavbarStore(useShallow((state) => ({
        toggleNavbarShow: state.toggleNavbarShow
    })))
  return (
      <Button onClick={toggleNavbarShow} variant={"ghost"} className='h-7 w-7 p-0 block sm:hidden'>
          <Menu />
      </Button>
  )
}
