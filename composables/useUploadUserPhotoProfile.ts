import { useUserData } from "~/utils/store/useUserData"
import { uploadFileToUserStorage } from "./utils/uploadFileToUserStorage"

export const useUploadUserPhotoProfile = () => {
    const { initializeUserData } = useUserData()
    async function saveUserPhotoProfile(file: File) {
        const { url } = await uploadFileToUserStorage(file, "photo-profile")
        const response = await $fetch("/api/user/user-data/edit", {
            method: "PATCH", body: {
                newData: { photo_profile: url }
            }
        })
        await initializeUserData()
        return response
    }

    return { saveUserPhotoProfile }
}