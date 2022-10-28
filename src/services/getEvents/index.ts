import { getAuth } from "firebase/auth";
import {
  collection,
  Query,
  DocumentData,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db, app } from "../../firebase";
import { CalendarEvent } from "../../types";
import { TimeFormat } from "../../utils/timeFormat";

export function GetEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const docRef = collection(db, "events");
  const auth = getAuth(app);

  let userId: string | null = null

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) userId = user.uid;
    });
  }, [events]);

  useEffect(() => {
    const q: Query<DocumentData> =
      userId !== undefined && userId
        ? query(docRef, where("userId", "==", userId))
        : query(docRef);

    async function GetEvents() {
      const data = await getDocs(q);
      const events = data.docs.map((doc) => {
        const { tittle, color, start, end } = doc.data();
        return {
          tittle,
          color,
          start: TimeFormat(start),
          end: TimeFormat(end),
          id: doc.id,
        };
      });
      setEvents(events);
    }

    onSnapshot(q, () => GetEvents());
  }, [userId]);

  return events
}
