import { MonthNumbers } from "luxon"
import { useParams } from "react-router-dom"
import { CalendarHeader } from "../../../components/calendarHeader"
import { Month } from "../../../components/month"
import { WeekDaysHeader } from "../../../components/weekDaysHeader"

import { GetDate } from "../../../utils/getDate"

type YearNMonth = {
    month: MonthNumbers;
    year: number;
}

export function MonthFormat() {
    function GetTime(){
        const { timeval } = useParams()
        if (!timeval) return { month: GetDate().month, year: GetDate().year }
        if (timeval.length > 7) window.location.pathname = 'calendar/month'

        for (let char = 0; char < timeval.length; char++) {
            const verify = (char == 2 && timeval.charAt(char) !== '-') || (char != 2 && isNaN(parseInt(timeval.charAt(char))))
            if (verify) window.location.pathname = 'calendar/month'
        }

        const [ monthVal, yearVal ] = timeval.split('-')
        const { month, year } = GetDate(parseInt(yearVal), parseInt(monthVal))

        if (year < 1902) window.location.pathname = "calendar/month/01-1902"
        if (year > 2100) window.location.pathname = "calendar/month/12-2100"

        return { month, year }
    }

    const time: YearNMonth = GetTime()

    const TwoDigitFormat = (num: number) => num.toString().length == 2 ? num : '0' + num

    function newMonth(count: number) {
        const { month, year } = GetDate(time.year, time.month).plus({ month: count })
        if (month === GetDate().month && year === GetDate().year) return window.location.pathname = '/calendar/month'
        if (year < 1902) window.location.pathname = "calendar/month/01-1902"
        if (year > 2100) window.location.pathname = "calendar/month/12-2100"
        window.location.pathname = `/calendar/month/${TwoDigitFormat(month)}-${year}`
    }

    const DayString = (time: YearNMonth) => `${TwoDigitFormat(time.month)}-${time.year}`
    
    return (
        <section className="flex items-center justify-center flex-col h-full w-full">
            <CalendarHeader
                lastItem={() => newMonth(-1)}
                nextItem={() => newMonth(1)}
                value={`${GetDate(time.year, time.month).monthLong}/${time.year}`}
                disableLast={DayString(time) === "01-1902"}
                disableNext={DayString(time) === "12-2100"}
            />
            <WeekDaysHeader />
            <Month {...time} format="month" />
        </section>
    )
}
