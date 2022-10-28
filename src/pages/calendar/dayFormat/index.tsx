import { useState } from "react"
import { useParams } from "react-router-dom"
import { CalendarHeader } from "../../../components/calendarHeader"
import { Day } from "../../../components/day"
import { ListOfEvents } from "../../../components/listOfEvents"
import { Time } from "../../../types"
import { GetDate } from "../../../utils/getDate"

export function DayFormat() {
    const { timeval } = useParams()

    function GetTime(): Time {
        if (!timeval) return { day: GetDate().day, month: GetDate().month, year: GetDate().year }

        if (timeval.length !== 10) window.location.pathname = '/day'

        for (let i = 0; i < 10; i++) {
            const isValid = ((i === 2 || i === 5) && timeval.charAt(i) !== '-') || parseInt(timeval.charAt(i)) === NaN
            if (isValid) window.location.pathname = '/day';
        }

        const [dayVal, monthVal, yearVal] = timeval.split('-')

        const { day, month, year } = GetDate(parseInt(yearVal), parseInt(monthVal), parseInt(dayVal))

        return { day, month, year }
    }

    const time = GetTime()

    const TDF = (value: number) => value > 9 ? value : '0' + value //TwoDigitFormat  

    function newDay(count: number) {
        const { day, month, year } = GetDate(time.year, time.month, time.day).plus({ day: count })
        if (day === GetDate().day && month === GetDate().month && year === GetDate().year) return window.location.pathname = "day"
        window.location.pathname = `day/${TDF(day)}-${TDF(month)}-${year}`
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
