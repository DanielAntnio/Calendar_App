import { getAuth } from "firebase/auth";
import {
  collection,
  Query,
  DocumentData,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { db, app } from "../../firebase";
import { CalendarEvent } from "../../types";
import { TimeFormat } from "../../utils/timeFormat/default";

export async function GetEvents() {
  const docRef = collection(db, "events");
  const auth = getAuth(app);

  let userId: string | null = null;

  auth.onAuthStateChanged((user) => {
    if (user) userId = user.uid;
  });

  const q: Query<DocumentData> = userId
    ? query(docRef, where("userId", "==", userId))
    : query(docRef);

  // async function GetEventsOnce() {
    const data = await getDocs(q);
    const events: CalendarEvent[] = data.docs.map((doc) => {
      const { title, color, start, end } = doc.data();
      return {
        title,
        color,
        start: TimeFormat(start),
        end: TimeFormat(end),
        id: doc.id,
      };
    });
    return events;
  // }

  // onSnapshot(q, GetEventsOnce)
}
