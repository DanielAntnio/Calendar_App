import { CalendarHeader } from "../../components/calendarHeader";
import { GetDate } from '../../components/getDate'; 
import { useState } from "react";
import { Day } from "../../components/day";
import { ClassName, DayFormatProps } from "../../types";

export function DayFormat({
    yearValue = GetDate().year,
    monthValue = GetDate().month,
    dayValue = GetDate().day,
    className = " "
}: DayFormatProps & ClassName
) {
    const [day, setDay] = useState(dayValue)
    const [month, setMonth] = useState(monthValue)
    const [year, setYear] = useState(yearValue)

    function newDay(NoL: "last" | "next"){
        let count = NoL === "next" ? 1 : -1
        setDay(GetDate(year, month, day).plus({ day: count }).day)
        setMonth(GetDate(year, month, day).plus({ day: count }).month)
        setYear(GetDate(year, month, day).plus({ day: count }).year)
    }

    return (
        <div className={`${className} h-full w-full items-center justify-center flex-col`} >
            <CalendarHeader 
                lastItem={() => newDay("last")} 
                nextItem={() => newDay("next")} 
                value={`${month}/${year}`}
            />
            <Day 
                day={day}
                weekday={GetDate(year, month, day).weekdayLong}
                className={`flex-1 p-4 flex flex-row h-8 w-full bg-slate-500 dark:bg-slate-700 dark:opacity-70 items-center justify-center`}
            />
        </div>
    )
}