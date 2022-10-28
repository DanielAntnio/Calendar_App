import { GetEvents } from "../../services/getEvents";
import { CalendarEvent, Time } from "../../types";

export function GetTodayEvents(time: Time): CalendarEvent[] {
  const events = GetEvents()

  if(events.length === 0) return []

  const filteredEvents = events.filter((event) => {
    const dayCheck =
      event.start.Day.day <= time.day && event.end.Day.day >= time.day;
    const monthCheck =
      event.start.Day.month <= time.month && event.end.Day.month >= time.month;
    const yearCheck =
      event.start.Day.year <= time.year && event.end.Day.year >= time.year;

    return dayCheck && monthCheck && yearCheck;
  });

  const eventsInOrder = filteredEvents.sort((a, b) => {
    return (
      a.start.Hour.hour +
      a.start.Hour.minute / 60 -
      (b.start.Hour.hour + b.start.Hour.minute / 60)
    );
  });

  return eventsInOrder;
}
