import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public;

  const firebaseConfig = {
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storage,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: config.measurementId
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