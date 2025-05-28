import { uploadRecipeImage } from "./utils/uploadRecipeImage"
type Image = {
    selectedFile: null | File,
    previewCard: string,
    previewDialog: string
}

export const useRecipeImageForm = (previewImage: string = "/image/image-default.jpeg") => {
    const image = ref<Image>({ selectedFile: null, previewCard: previewImage, previewDialog: previewImage })
    const uploadLoadingStatus = ref(false)

    function deleteImage() {
        image.value = { previewDialog: previewImage, previewCard: previewImage, selectedFile: null }
    }

    function changeImage(e: Event, callback?: () => void) {
        const target = e.target as HTMLInputElement
        const file = target.files?.[0]

        if (!file) return

        if (image.value.previewDialog.startsWith("blob:")) {
            URL.revokeObjectURL(image.value.previewDialog);
        }

        const blobUrl = URL.createObjectURL(file);
        image.value.selectedFile = file
        image.value.previewDialog = blobUrl;

        callback?.();
    }

    async function uploadImage(callback?: () => void) {
        try {
            uploadLoadingStatus.value = true
            const file = image.value.selectedFile
            if (file) {
                const { url } = await uploadRecipeImage(file)
                image.value.previewCard = url
                callback?.()
            }
        } catch (err) {
            console.error("Upload error: ", err)
            throw err
        } finally {
            uploadLoadingStatus.value = false
        }
    }

    return { image, uploadLoadingStatus, deleteImage, changeImage, uploadImage }
}