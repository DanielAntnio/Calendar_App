import { useEffect } from "react"
import { GetHolidays } from "../../../services/getHolidays"
import { Time } from "../../../types"
import { GetTodayEvents } from "../../../utils/getTodayEvents"
import { Event } from "../event"
import { HolidayHTML } from "../holiday"

export function ListOfEvents(time: Time) {
    const events = GetTodayEvents(time)
    const holidays = GetHolidays(time)

    return (
        <ul className="flex flex-col flex-1 w-full max-h-[calc(100vh-7.25rem)] overflow-y-scroll overflow-x-hidden">
            {
                !(events.length === 0 && holidays.length === 0) ? null
                    : <li className="flex w-full h-full items-center justify-center">0 Eventos</li>
            }
            {
                holidays.length === 0 ? null
                    : holidays.map((holiday, index) => <HolidayHTML holiday={holiday} index={index} key={index} />)
            }
            {
                events.length === 0 ? null
                    : events.map((event, index) => <Event event={event} time={time} key={index} />)
            }
        </ul>
    )
}