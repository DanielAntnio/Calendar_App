import { useEffect, useState } from "react";
import { CalendarEvent, Time } from "../../types"
import { GetDate } from "../getDate"
import { GetTodayEvents } from "../getTodayEvents";

export function AlertEvent(time: Time) {
  const [ events, setEvents ]= useState<CalendarEvent[]>([])

  useEffect(() => {
    async function getEvents() {
      setEvents(await GetTodayEvents(time))
    }
    getEvents()
  }, [])

  if (events.length === 0) return;

  const MINUTE_MS = 60000;

  const delay = MINUTE_MS - (1000 * GetDate().second)

  function alertEvent() {
    events.forEach(event => {
      const { hour, minute } = event.start.Hour
      if(hour === GetDate().hour && minute === GetDate().minute) alert(`O evento ${event.title} se iniciou.`)
    });
  }

  function start() {
    alertEvent()
    setInterval(alertEvent, MINUTE_MS)
  }

  setTimeout(start, delay)
}
