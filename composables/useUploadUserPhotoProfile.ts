import { useUserData } from "~/utils/store/useUserData"
import { uploadUserPhotoProfile } from "./utils/uploadUserPhotoProfile"

export const useUploadUserPhotoProfile = () => {
    const { initializeUserData } = useUserData()
    async function saveUserPhotoProfile(file: File) {
        const { url } = await uploadUserPhotoProfile(file)
        const response = await $fetch("/api/user/user-data/edit", {
            method: "PATCH", body: {
                newData: { photo_profile: url }
            }
        })
        await initializeUserData()
        console.log({ response })
        return response
    }

    return { saveUserPhotoProfile }
}