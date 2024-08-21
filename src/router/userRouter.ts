import { firestore } from "@/lib/firebase/firestore";
import { addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { User } from "next-auth";
import { decodeBcrypt, encodeBcrypt } from "@/lib/hash/bcrypt";

const userCollectionRef = collection(firestore, "users");

const UserRouter = {
    createUser: async (username: string, password: string) => {
        const hashedPassword = await encodeBcrypt(password)
        const userTemplateData = {
            username,
            password: hashedPassword,
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
};

export default UserRouter;
