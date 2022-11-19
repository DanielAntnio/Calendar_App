import { useParams } from "react-router-dom"
import { CalendarHeader } from "../../../components/calendarHeader"
import { Month } from "../../../components/month"
import { WeekDaysHeader } from "../../../components/weekDaysHeader"
import { GetDate } from "../../../utils/getDate"

export function MonthFormat() {
    function GetTime(){
        const { timeval } = useParams()
        if (!timeval) return { month: GetDate().month, year: GetDate().year }
        if (timeval.length > 7) window.location.pathname = '/month'

        for (let char = 0; char < timeval.length; char++) {
            const verify = (char == 2 && timeval.charAt(char) !== '-') || (char != 2 && isNaN(parseInt(timeval.charAt(char))))
            if (verify) window.location.pathname = '/month'
        }

        const [ monthVal, yearVal ] = timeval.split('-')
        const { month, year } = GetDate(parseInt(yearVal), parseInt(monthVal))

        return { month, year }
    }

    const time = GetTime()

    const TwoDigitFormat = (value: number) => value >= 10 ? value : '0' + value 

    function newMonth(count: number) {
        const { month, year } = GetDate(time.year, time.month).plus({ month: count })
        console.log(month, year)
        if (month === GetDate().month && year === GetDate().year) return window.location.pathname = '/month'
        window.location.pathname = `/month/${TwoDigitFormat(month)}-${year}`
    }

    return (
        <div className="flex items-center justify-center flex-col h-full w-full">
            <CalendarHeader
                lastItem={() => newMonth(-1)}
                nextItem={() => newMonth(1)}
                value={`${GetDate(time.year, time.month).monthLong}/${time.year}`}
            />
            <WeekDaysHeader />
            <Month {...time} format="month" />
        </div>
    )
}
