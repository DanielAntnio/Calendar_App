import { useParams } from "react-router-dom"
import { CalendarHeader } from "../../../components/calendarHeader"
import { Day } from "../../../components/day"
import { ListOfEvents } from "../../../components/event/listOfEvents"
import { Time } from "../../../types"
import { GetDate } from "../../../utils/getDate"

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

        if (year < 1902) window.location.pathname = "calendar/day/01-01-1902"
        if (year > 2100) window.location.pathname = "calendar/day/31-12-2100"

        return { day, month, year }
    }

    const TwoDigitFormat = (num: number) => num.toString().length == 2 ? num : '0' + num

    const time = GetTime()

    function newDay(count: number) {
        const { day, month, year } = GetDate(time.year, time.month, time.day).plus({ day: count })
        if (day === GetDate().day && month === GetDate().month && year === GetDate().year) return window.location.pathname = "calendar/day"
        if (year < 1902) return window.location.pathname = "calendar/day/01-01-1902"
        if (year > 2100) return window.location.pathname = "calendar/day/31-12-2100"
        window.location.pathname = `calendar/day/${TwoDigitFormat(day)}-${TwoDigitFormat(month)}-${year}`
    }

    const DayString = (time: Time) => `${TwoDigitFormat(time.day)}-${TwoDigitFormat(time.month)}-${time.year}`

    return (
        <section className="flex items-center justify-center flex-col h-full w-full" >
            <CalendarHeader
                lastItem={() => newDay(-1)}
                nextItem={() => newDay(1)}
                value={`${time.month}/${time.year}`}
                disableLast={DayString(time) === "01-01-1902"}
                disableNext={DayString(time) === "31-12-2100"}
            />
            <Day
                time={time}
                format="day"
                className={`p-5 flex flex-row h-8 w-full bg-slate-500/60 dark:bg-slate-800/70 items-center justify-center`}
            />
            <ListOfEvents {...time} />
        </section>
    )
}
