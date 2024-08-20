import { firestore } from "@/lib/firebase/firestore";
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { User } from "next-auth";

const userCollectionRef = collection(firestore, "users")
const UserRouter = {
    createUser: async (username: string, password: string) => {
        const userTemplateData = {
            username,
            password,
        }
        const userRef = await addDoc(userCollectionRef, userTemplateData)
        const userId = userRef.id
        const userData = { id: userId, ...userTemplateData }
        await updateDoc(userRef, userData)
        return userData
    },
    getUser: async (username: string, password: string) => {
        const userQuery = query(userCollectionRef, where("username", "==", username), where("password", "==", password));
        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            return userDoc.data() as User;
        } else {
            return null;
        }
    }
}

export default UserRouter