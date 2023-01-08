import { Query, DocumentData, getDocs } from "firebase/firestore"
import { CalendarEvent } from "../../types"
import { TimeFormat } from "../../utils/timeFormat/default"
import { GetQuerry } from "../getQuerry"

export async function GetEvents() {
  const q: Query<DocumentData> = GetQuerry()

  const data = await getDocs(q)
  const events: CalendarEvent[] = data.docs.map((doc) => {
    const { title, color, start, end } = doc.data()
    return {
      title,
      color,
      start: TimeFormat(start),
      end: TimeFormat(end),
      id: doc.id,
    }
  })
  return events
}
