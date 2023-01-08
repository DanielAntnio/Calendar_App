import { CalendarPlus } from "phosphor-react"
import { useState } from "react"
import { CalendarEvent, Hour, Time } from "../../../types"
import { GetTimeByDayDate } from "../../../utils/getTimeByDayDate"
import { TwoDigitFormat } from "../../../utils/TwoDigitFormat"
import { EventDetails } from "../eventDetails"

type eventProps = {
    event: CalendarEvent
    time: Time
}

export function Event({ event, time }: eventProps) {
    const [hidden, setHidden] = useState(true)

    const start = event.start
    const end = event.end

    const duration = GetTimeByDayDate(end) - GetTimeByDayDate(start)

    function HourString(hour: Hour) { return `${TwoDigitFormat(hour.hour)}:${TwoDigitFormat(hour.minute)}` }
    function DayString(time: Time) { return `${TwoDigitFormat(time.day)}/${TwoDigitFormat(time.month)}/${time.year}` }

    const oneDayText = `${HourString(start.Hour)} - ${HourString(end.Hour)}`

    function textAllDay(start: Time, end: Time, year: number) {
        if (duration === 86340000) return "Todo o dia"
        if (start.year === year && end.year === year) return `${DayString(start).slice(0, 5)} - ${DayString(end).slice(0, 5)}`
        return `${DayString(start)} - ${DayString(end)}`
    }

    function MultiDayText() {
        const allDay = HourString(start.Hour) === "00:00" && HourString(end.Hour) === "23:59"

        if (allDay) return textAllDay(start.Day, end.Day, time.year)
        if (start.Day.year === time.year && end.Day.year === time.year) {
            return `${DayString(start.Day).slice(0, 5)} ${HourString(start.Hour)} - ${DayString(end.Day).slice(0, 5)} ${HourString(end.Hour)}`
        }
        return `${DayString(start.Day)} ${HourString(start.Hour)} - ${DayString(end.Day)} ${HourString(end.Hour)}`
    }

    return (
        <li
            className="m-2"
            key={event.id}
        >
            <div
                className="flex flex-col items-center justify-between p-2 rounded-xl bg-slate-400/40 dark:bg-slate-900/20"
                onClick={() => setHidden(!hidden)}
            >
                <div className="flex flex-row items-center">
                    {
                        duration < 86340000 ?
                            <span>{HourString(start.Hour)}</span>
                            : <CalendarPlus size={32} />
                    }
                    <div
                        className="h-6 w-2 rounded-full m-2"
                        style={{
                            backgroundColor: event.color
                        }}
                    />
                    <p>{event.title}</p>
                </div>

                <legend className="ml-full mt-2 text-xs">
                    {duration >= 86340000 ? MultiDayText() : oneDayText}
                </legend>
            </div>
            {hidden ? null : <EventDetails event={event} setHidden={setHidden} />}
        </li>
    )
}