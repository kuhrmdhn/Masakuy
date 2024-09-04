import { firestore } from "@/lib/firebase/firestore";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const publicRecipesCollectionRef = collection(firestore, "public_recipes");

const publicRecipeRouter = {
    createPublicRecipe: async (recipeData: any) => {
        try {
            const publicRecipe = await addDoc(publicRecipesCollectionRef, recipeData)
            return publicRecipe
        } catch (error) {
            console.error(error);
            throw error
        }
    },
    deletePublicRecipe: async (recipeId: string) => {
        try {
            const recipeRef = doc(firestore, `public_recipes/${recipeId}`);
            await deleteDoc(recipeRef);
        } catch (error) {
            console.error("Error deleting public recipe:", error);
            throw error;
        }
    },
    getPublicRecipe: async () => {
        const querySnapshot = await getDocs(collection(firestore, "public_recipes"));
        const recipes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return recipes
    },
    getRecipeById: async (recipeId:string) => {
        const recipeRef = doc(firestore, `public_recipes/${recipeId}`);
        const recipe = await getDoc(recipeRef)
        return recipe.data()
    }
}

export { publicRecipeRouter }