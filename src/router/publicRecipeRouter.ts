import { firestore } from "@/lib/firebase/firestore";
import { RecipeDetails } from "@/types/recipeType";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";

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
    getPublicRecipe: async (): Promise<RecipeDetails[]> => {
        const q = query(collection(firestore, "public_recipes"));
        const querySnapshot = await getDocs(q)
        const recipes: RecipeDetails[] = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data
            } as RecipeDetails;
        });
        return recipes;
    },
    getRecipeById: async (recipeId: string) => {
        const recipeRef = doc(firestore, `public_recipes/${recipeId}`);
        const recipe = await getDoc(recipeRef)
        return recipe.data()
    }
}

export { publicRecipeRouter }