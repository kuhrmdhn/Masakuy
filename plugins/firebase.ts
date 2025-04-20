import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

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
  const firestore = getFirestore(app)

  return {
    provide: {
      firebaseAuth,
      firestore
    }
  }
});