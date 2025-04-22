import { Firestore } from "firebase-admin/firestore"
import { H3Event } from 'h3'

export const useDb = (event: H3Event) => {
    const db: Firestore = event.context.firebaseAdminDb
    return { db }
}