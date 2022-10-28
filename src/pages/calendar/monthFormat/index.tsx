import { useState } from "react"
import { CalendarHeader } from "../../../components/calendarHeader"
import { Month } from "../../../components/month"
import { WeekDaysHeader } from "../../../components/weekDaysHeader"
import { GetDate } from "../../../utils/getDate"

export function MonthFormat() {
    const [time, setTime] = useState({
        month: GetDate().month,
        year: GetDate().year,
    })

    function newMonth(count: number) {
        const { month, year } = GetDate(time.year, time.month).plus({ month: count })
        setTime({month, year})
    }

    return (
        <div className="flex items-center justify-center flex-col h-full w-full">
            <CalendarHeader
                lastItem={() => newMonth(1)}
                nextItem={() => newMonth(-1)}
                value={`${GetDate(time.year, time.month).monthLong}/${time.year}`}
            />
            <WeekDaysHeader />
            <Month {...time} format="month" />
        </div>
    )
}
