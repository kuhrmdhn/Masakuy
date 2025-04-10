import { defineNitroPlugin } from '#imports'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

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

  const firebaseAdminAuth = getAuth()

  nitroApp.hooks.hook('request', (event) => {
    event.context.firebaseAdminAuth = firebaseAdminAuth
  })
})
