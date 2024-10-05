import { firestore } from "@/lib/firebase/firestore";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { User } from "next-auth";
import { decodeBcrypt, encodeBcrypt } from "@/lib/hash/bcrypt";
import { getSession } from "next-auth/react";
import { publicRecipeRouter } from "./publicRecipeRouter";
import { UserData, UserStore } from "@/store/UserStore";

const userCollectionRef = collection(firestore, "users");

const getUserData = async () => {
        const session = await getSession();
        if (session) {
            const userId = session.user.id;
            const userDocRef = doc(firestore, `users/${userId}`);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const { password, ...userData } = userDoc.data();
                UserStore.getState().setUserData(userData as UserData);
                return { userData, userDocRef };
            } else {
                throw new Error("User document does not exist");
            }
        } else {
            window.location.href = "/signIn";
            throw new Error("Session is empty");
        }
};

const UserRouter = {
    createUser: async (username: string, password: string) => {
        try {
            const hashedPassword = await encodeBcrypt(password);
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
        } catch (error) {
            console.error("Error creating user:", error); // Added error handling
            throw error;
        }
    },

    getUser: async (username: string, password: string) => {
        try {
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
        } catch (error) {
            console.error("Error getting user:", error); // Added error handling
            throw error;
        }
    },
    createUserRecipes: async (recipe: any) => {
        try {
            const user = await getUserData();
            const { userData, userDocRef } = user;
            const currentRecipes = userData.recipe_created;
            const recipeId = userData.id + Date.now();
            const publicRecipeRef = await publicRecipeRouter.createPublicRecipe({ ...recipe, authorId: userData.id });
            const publicRecipeId = publicRecipeRef.id;
            const newRecipe = { id: publicRecipeId, user_recipe_id: recipeId, ...recipe };
            const updatedRecipes = [...currentRecipes, newRecipe];
            await updateDoc(userDocRef, { recipe_created: updatedRecipes });
            await updateDoc(publicRecipeRef, { id: publicRecipeId })
            return newRecipe;
        } catch (error) {
            console.error("Error creating user recipes:", error);
            throw error;
        }
    },
    createUserSavedRecipes: async (recipeId: any) => {
        try {
            const user = await getUserData();
            const { userData, userDocRef } = user;
            const currentRecipes = userData.saved_recipe;
            const updatedRecipes = [...currentRecipes, recipeId];
            await updateDoc(userDocRef, { saved_recipe: updatedRecipes });
            getUserData()
        } catch (error) {
            console.error("Error creating user recipes:", error);
            throw error;
        }
    },

    deleteUserRecipes: async (recipeId: string) => {
        try {
            const user = await getUserData();
            const { userData, userDocRef } = user;
            const currentRecipes = userData.recipe_created;
            const publicRecipe = currentRecipes.find((recipe: any) => recipe.id === recipeId);

            if (publicRecipe) {
                await publicRecipeRouter.deletePublicRecipe(publicRecipe.id);
            }

            const updatedRecipes = currentRecipes.filter((recipe: any) => recipe.id !== recipeId);
            await updateDoc(userDocRef, { recipe_created: updatedRecipes });
            await getUserData()
        } catch (error) {
            console.error("Error deleting user recipes:", error);
            throw error;
        }
    },
    deleteUserSavedRecipes: async (recipeId: string) => {
        try {
            const user = await getUserData();
            const { userData, userDocRef } = user;
            const currentSavedRecipes = userData.saved_recipe;
            const updatedRecipes = currentSavedRecipes.filter((id: any) => id !== recipeId);
            await updateDoc(userDocRef, { saved_recipe: updatedRecipes });
            await getUserData()
        } catch (error) {
            console.error("Error deleting user recipes:", error);
            throw error;
        }
    },
    getUserRecipe: async () => {
        try {
            const user = await getUserData();
            return user?.userData?.recipe_created || [];
        } catch (error) {
            console.error("Error getting user recipes:", error);
            throw error;
        }
    },
    getUserSavedRecipe: async () => {
        try {
            const user = await getUserData();
            return user?.userData?.saved_recipe || [];
        } catch (error) {
            console.error("Error getting user recipes:", error);
            throw error;
        }
    },
    getUserById: async (userId: string) => {
        try {
            const userDoc = doc(firestore, `users/${userId}`);
            const user = await getDoc(userDoc);
            const data = user.data();
            return data?.username || null;
        } catch (error) {
            throw error;
        }
    }
};

export { UserRouter, getUserData };