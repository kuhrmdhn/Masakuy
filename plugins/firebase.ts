import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const publicConfig = config.public

  const firebaseConfig = {
    apiKey: publicConfig.apiKey,
    authDomain: publicConfig.authDomain,
    projectId: config.projectId,
    storageBucket: publicConfig.storage,
    messagingSenderId: publicConfig.messagingSenderId,
    appId: publicConfig.appId,
    measurementId: publicConfig.measurementId
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