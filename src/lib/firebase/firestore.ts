import app from "./config";
import { getFirestore } from "firebase/firestore";

export const firestore = getFirestore(app)