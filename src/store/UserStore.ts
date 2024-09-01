import { Recipe } from "@/types/recipeType";
import { create } from "zustand";

export interface UserData {
    id: string
    username: string
    recipe_created: Recipe[] | null
    photo_profile: string
}

type Store = {
    userData: UserData,
    setUserData: (data: UserData) => void
}

export const UserStore = create<Store>()((set) => ({
    userData: {
        id: "",
        username: "",
        photo_profile: "/images/default-photo-profile",
        recipe_created: null
    },
    setUserData(data) {
        set({ userData: data })
    },
}))