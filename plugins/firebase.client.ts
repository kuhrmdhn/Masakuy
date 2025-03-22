import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.apiKey,
    authDomain: config.public.authDomain,
    projectId: config.public.projectId,
    storageBucket: config.public.storage,
    messagingSenderId: config.public.messagingSenderId,
    appId: config.public.appId,
    measurementId: config.public.measurementId
  };

  const app = initializeApp(firebaseConfig);

  const firebaseAuth = getAuth(app);
  const firestore = getFirestore(app);
  const firebaseStorage = getStorage(app);

  return {
    provide: {
      firebaseAuth,
      firestore,
      firebaseStorage
    }
  }
});