import { getAuth } from "firebase/auth"
import {
  collection,
  Query,
  DocumentData,
  query,
  where,
} from "firebase/firestore"
import { db, app } from "../../firebase"

export function GetQuerry() {
  const docRef = collection(db, "events")
  const auth = getAuth(app)

  let userId: string | null = null

  auth.onAuthStateChanged((user) => {
    if (user) userId = user.uid
  })

  return userId ? query(docRef, where("userId", "==", userId)) : query(docRef)
}
