import { create } from "zustand";

type NavbarStore = {
    navbarShow: boolean
    toggleNavbarShow: () => void
}

export const NavbarStore = create<NavbarStore>()((set) => ({
    navbarShow: false,
    toggleNavbarShow: () => set((state) => ({ navbarShow: !state.navbarShow }))
}))