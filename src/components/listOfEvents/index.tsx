import { Time } from "../../types"
import { GetTodayEvents } from "../../utils/getTodayEvents"
import { Event } from "../event"

export function ListOfEvents(time: Time) {
    const events = GetTodayEvents(time)
    return (
        <ul className="flex flex-col flex-1 w-full max-h-[calc(100vh-7.25rem)] overflow-y-scroll overflow-x-hidden">
            {
                events.length === 0
                    ? <li className="flex w-full h-full items-center justify-center">0 Eventos</li>
                    : events.map((event, index) => <Event event={event} key={index} />)
            }
        </ul>
    )
}