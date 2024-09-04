import { firestore } from "@/lib/firebase/firestore";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { User } from "next-auth";
import { decodeBcrypt, encodeBcrypt } from "@/lib/hash/bcrypt";
import { getSession } from "next-auth/react";
import { publicRecipeRouter } from "./publicRecipeRouter";
import { UserData, UserStore } from "@/store/UserStore";

const userCollectionRef = collection(firestore, "users");

const getUserData = async () => {
    const session = await getSession()
    if (session) {
        const userId = session.user.id
        const userDocRef = doc(firestore, `users/${userId}`);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
            const { password, ...userData } = userDoc.data()
            UserStore.getState().setUserData(userData as UserData)
            return { userData, userDocRef }
        }
    } else {
        throw new Error("Can`t get session")
    }
}

const UserRouter = {
    createUser: async (username: string, password: string) => {
        const hashedPassword = await encodeBcrypt(password)
        const userTemplateData = {
            username,
            password: hashedPassword,
            recipe_created: [],
            photo_profile: ""
        };
        const userRef = await addDoc(userCollectionRef, userTemplateData);
        const userId = userRef.id;
        const userData = { id: userId, ...userTemplateData };
        await updateDoc(userRef, userData);
        return userData;
    },
    getUser: async (username: string, password: string) => {
        const userQuery = query(userCollectionRef, where("username", "==", username));
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data() as User;

            const isPasswordValid = await decodeBcrypt(password, userData.password);
            if (isPasswordValid) {
                return userData;
            }
        }
        return null;
    },
    createUserRecipes: async (recipe: any) => {
        const user = await getUserData()
        const data = user?.userData;
        if (data) {
            const userDocRef = user?.userDocRef
            const currentRecipes = data.recipe_created;
            const recipeId = data.id + Date.now()
            const publicRecipeRef = await publicRecipeRouter.createPublicRecipe({ ...recipe, authorId: data.id })
            const publicRecipeId = publicRecipeRef.id;
            const newRecipe = { id: recipeId, public_id: publicRecipeId, ...recipe }
            const updatedRecipes = [...currentRecipes, newRecipe];
            await updateDoc(userDocRef, { recipe_created: updatedRecipes });
        }
        getUserData()
    },
    deleteUserRecipes: async (recipeId: string) => {
        const user = await getUserData();
        const data = user?.userData;
        if (data) {
            const userDocRef = user?.userDocRef;
            const currentRecipes = data.recipe_created;
            const publicRecipe = currentRecipes.find((recipe: any) => recipe.id === recipeId);

            if (publicRecipe) {
                await publicRecipeRouter.deletePublicRecipe(publicRecipe.public_id);
            }

            const updatedRecipes = currentRecipes.filter((recipe: any) => recipe.id !== recipeId);
            await updateDoc(userDocRef, { recipe_created: updatedRecipes });
        }
        getUserData()
    },
    getUserRecipe: async () => {
        const user = await getUserData();
        const data = user?.userData;
        if (data) {
            const currentRecipes = data.recipe_created;
            return currentRecipes
        }
    },
    getUserById: async (userId: string) => {
        const userDoc = doc(firestore, `users/${userId}`)
        const user = await getDoc(userDoc)
        const data = user.data()
        return data && data.username

    }
}

export { UserRouter, getUserData };
