import { useState } from "react"
import { useParams } from "react-router-dom"
import { CalendarHeader } from "../../../components/calendarHeader"
import { Day } from "../../../components/day"
import { ListOfEvents } from "../../../components/listOfEvents"
import { Time } from "../../../types"
import { GetDate } from "../../../utils/getDate"
import { TwoDigitFormat } from "../../../utils/twoDigitFormat"

export function DayFormat() {
    function GetTime(): Time {
        const { timeval } = useParams()
        if (!timeval) return { day: GetDate().day, month: GetDate().month, year: GetDate().year }

        if (timeval.length > 10) window.location.pathname = 'calendar/day'

        for (let i = 0; i < timeval.length; i++) {
            const verify = ((i === 2 || i === 5) && timeval.charAt(i) !== '-') || ((i !== 2 && i !== 5) && isNaN(parseInt(timeval.charAt(i))))
            if (verify) window.location.pathname = 'calendar/day'
        }

        const [dayVal, monthVal, yearVal] = timeval.split('-')

        const { day, month, year } = GetDate(parseInt(yearVal), parseInt(monthVal), parseInt(dayVal))

        return { day, month, year }
    }

    const time = GetTime()

    function newDay(count: number) {
        const { day, month, year } = GetDate(time.year, time.month, time.day).plus({ day: count })
        if (day === GetDate().day && month === GetDate().month && year === GetDate().year) return window.location.pathname = "calendar/day"
        window.location.pathname = `calendar/day/${TwoDigitFormat(day)}-${TwoDigitFormat(month)}-${year}`
    }

    return (
        <div className="flex items-center justify-center flex-col h-full w-full" >
            <CalendarHeader
                lastItem={() => newDay(-1)}
                nextItem={() => newDay(1)}
                value={`${time.month}/${time.year}`}
            />
            <Day
                time={time}
                format="day"
                className={`p-5 flex flex-row h-8 w-full bg-slate-500/60 dark:bg-slate-800/70 items-center justify-center`}
            />
            <ListOfEvents {...time} />
        </div>
    )
}
