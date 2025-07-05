import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin(() => {
  const clientConfig = useRuntimeConfig().public.firebaseClient;

  const firebaseConfig = {
    apiKey: clientConfig.apiKey,
    authDomain: clientConfig.authDomain,
    projectId: clientConfig.projectId,
    storageBucket: clientConfig.storage,
    messagingSenderId: clientConfig.messagingSenderId,
    appId: clientConfig.appId,
    measurementId: clientConfig.measurementId
  };

  const app = initializeApp(firebaseConfig);

  const firebaseAuth = getAuth(app);
  const firestore = getFirestore(app)
  const firebaseStorage = getStorage(app)

  return {
    provide: {
      firebaseAuth,
      firestore,
      firebaseStorage
    }
  }
});