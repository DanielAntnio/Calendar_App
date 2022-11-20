import { DateTime } from "luxon"
import { useParams } from "react-router-dom"
import { CalendarHeader } from "../../../components/calendarHeader"
import { ListOfEvents } from "../../../components/listOfEvents"
import { Week } from "../../../components/week"
import { Time } from "../../../types"
import { GetDate } from "../../../utils/getDate"
import { GetWeekDays } from "../../../utils/getWeekDays"
import { TwoDigitFormat } from "../../../utils/twoDigitFormat"

export function WeekFormat() {
    function GetTime(): Time {
        const { timeval } = useParams()
        if (!timeval) return { day: GetDate().day, month: GetDate().month, year: GetDate().year }
        if (timeval.length > 7) window.location.pathname = "calendar/week"
        for (let char = 0; char < timeval.length; char++) {
            const verify = (char == 2 && timeval.charAt(char) !== '-') || char != 2 && isNaN(parseInt(timeval.charAt(char)))
            if (verify) window.location.pathname = "calendar/week"
        }
        const [ weekNumberVal, yearVal ] = timeval.split("-")
        const weekNumber = parseInt(weekNumberVal)
        const { day, month, year } = DateTime.fromObject({
            weekYear: parseInt(yearVal),
            weekNumber: weekNumber
        }).plus({ day: -1 });
        return { day, month, year }
    }

    const time = GetTime()

    function newWeek(count: number) {
        const { year, weekNumber } = GetDate(time.year, time.month, time.day).plus({ day: count })
        if ( year === GetDate().plus({ day: 1 }).year && weekNumber === GetDate().plus({ day: 1 }).weekNumber ) return window.location.pathname = "calendar/week"
        window.location.pathname = `calendar/week/${TwoDigitFormat(weekNumber)}-${year}`
    }

    return (
        <div className="flex items-center justify-center flex-col h-full w-full">
            <CalendarHeader
                value={`${GetDate(time.year, time.month, time.day).monthLong}/${time.year}`}
                nextItem={() => newWeek(8)}
                lastItem={() => newWeek(-6)}
            />
            <Week days={GetWeekDays(time)} showWeekday={true} format="week" />
            <div className="flex flex-row h-full w-full">
                {
                    GetWeekDays(time).map((day, index) => <ListOfEvents {...day} key={index} />)
                }
            </div>
        </div>
    )
}
