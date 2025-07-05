import { defineNitroPlugin } from '#imports'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { Auth, getAuth } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

export default defineNitroPlugin((nitroApp) => {
  const adminConfig = useRuntimeConfig().firebaseAdmin
  let app;
  if (!getApps().length) {
    app = initializeApp({
      credential: cert({
        projectId: adminConfig.projectId,
        clientEmail: adminConfig.clientEmail,
        privateKey: adminConfig.privateKey.replace(/\\n/g, '\n'),
      }),
      projectId: process.env.FIREBASE_PROJECT_ID,
    })
  }

  const firebaseAdminAuth: Auth = getAuth()
  const adminFirestore: Firestore = getFirestore()
  const firebaseAdminStorage = getStorage(app)

  nitroApp.hooks.hook('request', (event) => {
    event.context.firebaseAdminAuth = firebaseAdminAuth
    event.context.adminFirestore = adminFirestore
    event.context.firebaseAdminStorage = firebaseAdminStorage
  })
})
