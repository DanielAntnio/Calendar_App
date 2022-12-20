import { useEffect, useState } from "react"
import Loading from "react-loading"
import { GetHolidays } from "../../../services/getHolidays"
import { CalendarEvent, Holiday, Time } from "../../../types"
import { GetTodayEvents } from "../../../utils/getTodayEvents"
import { Event } from "../event"
import { HolidayHTML } from "../holiday"

export function ListOfEvents(time: Time) {
    const [ events, setEvents ]= useState<CalendarEvent[]>([])
    const [ holidays, setHolidays ]= useState<Holiday[]>([])
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        async function getEvents() {
          setEvents(await GetTodayEvents(time))
          setHolidays(await GetHolidays(time))
          setIsLoading(false)
        }
        getEvents()
    }, [])

    return (
        <ul className="flex flex-col flex-1 w-full max-h-[calc(100vh-7.25rem)] overflow-y-scroll overflow-x-hidden">
            {
                isLoading ? <li className="flex w-full h-full items-center justify-center"><Loading type="spin" /></li> :
                events.length === 0 && holidays.length === 0 
                ? <li className="flex w-full h-full items-center justify-center">0 Eventos</li> :
                <>
                    {holidays.map((holiday, index) => <HolidayHTML holiday={holiday} index={index} key={index} />)}
                    {events.map((event, index) => <Event event={event} time={time} key={index} />)}
                </>
            }
        </ul>
    )
}