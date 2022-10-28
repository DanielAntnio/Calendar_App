import { useState } from "react"
import { CalendarEvent } from "../../types"
import { EventDetails } from "../eventDetails"

type EventProps = {
    event: CalendarEvent
}

export function Event({event}: EventProps) {
    const [ hidden, setHidden ] = useState(true)

    const TDF = (value: number) => value < 10 ? '0' + value : value //TwoDigitFormat

    const startHour = event.start.Hour
    const endHour = event.end.Hour

    return (
        <li
            className="m-2"
            key={event.id}
        >
            <div
                className="flex flex-col h-20 items-center justify-between p-2 rounded-xl bg-slate-400/40 dark:bg-slate-900/20"
                onClick={() => setHidden(!hidden)}
            >
                <div className="flex flex-row items-center">
                    <p>{TDF(startHour.hour)}:{TDF(startHour.minute)}</p>
                    <div
                        className="h-6 w-2 rounded-full m-2"
                        style={{
                            backgroundColor: event.color
                        }}
                    />
                    <p>{event.tittle}</p>
                </div>

                <legend className="ml-full mt-2 text-xs">
                    {
                        `${TDF(startHour.hour)}:${TDF(startHour.minute)} - ${TDF(endHour.hour)}:${TDF(endHour.minute)}`
                    }
                </legend>
            </div>
            { hidden ? null : <EventDetails event={event} setHidden={setHidden} />}
        </li>
    )
}