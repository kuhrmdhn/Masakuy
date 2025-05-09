import { defineNitroPlugin } from '#imports'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { Auth, getAuth } from 'firebase-admin/auth'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

export default defineNitroPlugin((nitroApp) => {
  const config = useRuntimeConfig()
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: config.public.projectId,
        clientEmail: config.clientEmail,
        privateKey: config.privateKey?.replace(/\\n/g, '\n'),
      }),
      projectId: process.env.FIREBASE_PROJECT_ID,
    })
  }

  const firebaseAdminAuth: Auth = getAuth()
  const firebaseAdminDb: Firestore = getFirestore()

  nitroApp.hooks.hook('request', (event) => {
    event.context.firebaseAdminAuth = firebaseAdminAuth,
      event.context.firebaseAdminDb = firebaseAdminDb
  })
})
