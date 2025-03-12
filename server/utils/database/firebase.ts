import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const { apiKey, authDomain, appId, measurementId, messagingSenderId, public: publicVar } = useRuntimeConfig();

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId: publicVar.projectId,
  storageBucket: publicVar.storage,
  messagingSenderId,
  appId,
  measurementId
};

const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app)
export const firestore = getFirestore(app)