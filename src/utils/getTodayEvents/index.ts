import { GetEvents } from "../../services/getEvents";
import { CalendarEvent, dayDate, Time } from "../../types";
import { GetTime } from "../getTime";
import { GetTimeByDayDate } from "../getTimeByDayDate";

export function GetTodayEvents(time: Time): CalendarEvent[] {
  const events = GetEvents()

  if (events.length === 0) return []

  const filteredEvents = events.filter((event) => {
    const start = GetTime(event.start.Day.year, event.start.Day.month, event.start.Day.day)
    const end = GetTime(event.end.Day.year, event.end.Day.month, event.end.Day.day)
    const now = GetTime(time.year, time.month, time.day)

    return start <= now && now <= end
  });

  const eventsInOrder = filteredEvents.sort((eventOne, eventTwo) => GetTimeByDayDate(eventOne.start) - GetTimeByDayDate(eventTwo.start));

  return eventsInOrder;
}
