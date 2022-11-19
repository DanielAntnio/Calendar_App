import { useParams } from "react-router-dom"
import { CalendarHeader } from "../../../components/calendarHeader"
import { ListOfEvents } from "../../../components/listOfEvents"
import { Week } from "../../../components/week"
import { Time } from "../../../types"
import { GetDate } from "../../../utils/getDate"
import { GetWeekDays } from "../../../utils/getWeekDays"

export function WeekFormat() {
    function GetTime(): Time {
        const { timeval } = useParams()
        if (!timeval) return { day: GetDate().day, month: GetDate().month, year: GetDate().year }
        if (timeval.length > 7) window.location.pathname = "/week"
        for (let char = 0; char < timeval.length; char++) {
            const verify = (char == 2 && timeval.charAt(char) !== '-') || char != 2 && isNaN(parseInt(timeval.charAt(char)))
            if (verify) window.location.pathname = "/week"
        }
        const [ weekYearVal, yearVal ] = timeval.split("-")
        const { day, month, year } = GetDate(parseInt(yearVal), 1, 1).plus({ day: parseInt(weekYearVal) * 7 })
        return { day, month, year }
    }

    const time = GetTime()

    const TwoDigitFormat = (value: number) => value > 10 ? value : '0' + value 

    function newWeek(count: number) {
        const { year, weekNumber } = GetDate(time.year, time.month, time.day).plus({ day: count })
        console.log(GetDate().weekNumber)
        if ( year === GetDate().year && weekNumber === GetDate().weekNumber ) return window.location.pathname = "week"
        window.location.pathname = `week/${TwoDigitFormat(weekNumber)}-${year}`
    }

    return (
        <div className="flex items-center justify-center flex-col h-full w-full">
            <CalendarHeader
                value={`${GetDate(time.year, time.month, time.day).monthLong}/${time.year}`}
                nextItem={() => newWeek(7)}
                lastItem={() => newWeek(-7)}
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
