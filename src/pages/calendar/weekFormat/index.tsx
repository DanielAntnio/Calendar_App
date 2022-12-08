import { DateTime } from "luxon"
import { useParams } from "react-router-dom"
import { CalendarHeader } from "../../../components/calendarHeader"
import { ListOfEvents } from "../../../components/event/listOfEvents"
import { Week } from "../../../components/week"
import { Time } from "../../../types"
import { GetDate } from "../../../utils/getDate"
import { GetWeekDays } from "../../../utils/getWeekDays"

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

        if (GetDate(year, month, day).plus({ day: 6 }).year < 1902) window.location.pathname = "calendar/week/01-1902"
        if (year > 2100) window.location.pathname = "calendar/week/52-2100"

        return { day, month, year }
    }

    const time = GetTime()

    function newWeek(count: number) {
        const { year, weekNumber } = GetDate(time.year, time.month, time.day).plus({ day: count })
        if ( year === GetDate().plus({ day: 1 }).year && weekNumber === GetDate().plus({ day: 1 }).weekNumber ) return window.location.pathname = "calendar/week"
        if (year < 1902) return window.location.pathname = "calendar/week/01-1902"
        if (year > 2100) return window.location.pathname = "calendar/week/52-2100"
        window.location.pathname = `calendar/week/${TwoDigitFormat(weekNumber)}-${year}`
    }

    const TwoDigitFormat = (num: number) => num.toString().length == 2 ? num : '0' + num

    const DayString = (time: Time, count: number) => {
        const { year, weekNumber } = GetDate(time.year, time.month, time.day).plus({ day: count })
        return `${TwoDigitFormat(weekNumber)}-${year}`
    }

    return (
        <section className="flex items-center justify-center flex-col h-full w-full overflow-x-scroll">
            <CalendarHeader
                value={`${GetDate(time.year, time.month, time.day).monthLong}/${time.year}`}
                nextItem={() => newWeek(8)}
                lastItem={() => newWeek(-6)}
                disableLast={DayString(time, 6) === "01-1902"}
                disableNext={DayString(time, 0) === "51-2100"}
            />

            <Week days={GetWeekDays(time)} showWeekday={true} format="week" />
            <div className="flex flex-row h-full w-full">
                { GetWeekDays(time).map((day, index) => <ListOfEvents {...day} key={index} />) }
            </div>
        </section>
    )
}
