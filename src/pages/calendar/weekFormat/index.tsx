import { useState } from "react"
import { CalendarHeader } from "../../../components/calendarHeader"
import { ListOfEvents } from "../../../components/listOfEvents"
import { Week } from "../../../components/week"
import { GetDate } from "../../../utils/getDate"
import { GetWeekDays } from "../../../utils/getWeekDays"

export function WeekFormat() {
    const [time, setTime] = useState({
        day: GetDate().day,
        month: GetDate().month,
        year: GetDate().year,
    })

    function newWeek(count: number) {
        const { day, month, year } = GetDate(time.year, time.month, time.day).plus({ day: count })
        setTime({day, month, year})
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
