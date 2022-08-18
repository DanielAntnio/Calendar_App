import { useState } from "react";
import { CalendarHeader } from "../../components/calendarHeader";
import { GetDate } from "../../components/getDate";
import { Week } from "../../components/week/Week"
import { WeekDaysHeader } from "../../components/weekDaysHeader";
import { ClassName } from "../../types";

export function WeekFormat({className = " "}: ClassName
) {
    const [ time, setTime ] = useState({
        day: GetDate().day,
        month: GetDate().month,
        year: GetDate().year,
    })

    function newWeek(NoL: "last" | "next"): void {
        let count = NoL === "next" ? 7 : -7
        setTime({
            day: GetDate(time.year, time.month , time.day).plus({ day: count }).day,
            month: GetDate(time.year, time.month , time.day).plus({ day: count }).month,
            year: GetDate(time.year, time.month , time.day).plus({ day: count }).year,
        })
    }

    return (
        <div className={`${className} h-full w-full items-center justify-center flex-col`}>
            <CalendarHeader
                value={`${GetDate(time.year, time.month, time.day).monthLong}/${time.year}`}
                nextItem={() => newWeek("next")}
                lastItem={() => newWeek("last")}
            />
            <WeekDaysHeader />
            <Week time={time}  />
        </div>
    )
}
