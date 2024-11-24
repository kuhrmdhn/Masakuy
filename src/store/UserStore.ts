import { Recipe } from "@/types/recipeType";
import { create } from "zustand";

export interface UserData {
    id: string
    username: string
    recipe_created: Recipe[] | null
    saved_recipe?: Recipe[] | null
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
        photo_profile: "/images/default-image.webp",
        recipe_created: null,
        saved_recipe: null
    },
    setUserData(data) {
        const photoProfile = data.photo_profile === "" ? this.userData.photo_profile : data.photo_profile
        set({ userData: { ...data, photo_profile: photoProfile } })
    },
}))