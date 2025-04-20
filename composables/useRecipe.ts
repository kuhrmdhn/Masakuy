import { collection, doc, getDoc, getDocs } from "firebase/firestore"

export const useRecipe = () => {
    const { $firestore } = useNuxtApp()

    async function getPublicRecipes() {
        try {
            const recipesRef = collection($firestore, "public_recipes")
            const snapshot = await getDocs(recipesRef)
            if (snapshot.empty) {
                console.error("Something error");
                return
            }
            const data = snapshot.docs.map((doc) => doc.data())
            return data
        } catch (err) {
            console.error(err);
            return null
        }
    }

    async function getRecipeAuthor(authorId: string) {
        const userRef = doc($firestore, `users/${authorId}`)
        const snapshot = await getDoc(userRef)
        if(!snapshot.exists()) return
        const user = snapshot.data()
        return user.username
    }
    return { getPublicRecipes, getRecipeAuthor }
}