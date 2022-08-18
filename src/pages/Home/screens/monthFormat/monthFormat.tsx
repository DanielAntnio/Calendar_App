import { GetDate } from "../../components/getDate";
import { CalendarHeader } from "../../components/calendarHeader";
import { useState } from "react";
import { WeekDaysHeader } from "../../components/weekDaysHeader";
import { Month } from "../../components/month/month";
import { ClassName } from "../../types";

export function MonthFormat({ className = " " }:  ClassName) {
    const [time, setTime] = useState({
        month: GetDate().month,
        year: GetDate().year,
    })

    function newMonth(NoL: "last" | "next"): void {
        let count = NoL === "next" ? 1 : -1

        let newMonth = GetDate(time.year, time.month).plus({ month: count }).month
        let newYear = GetDate(time.year, time.month).plus({ month: count }).year

        setTime({
            month: newMonth,
            year: newYear
        })
    }

    return (
        <div className={`${className} h-full w-full items-center justify-center flex-col`}>
            <CalendarHeader 
                lastItem={() => newMonth("last")} 
                nextItem={() => newMonth("next")} 
                value={`${GetDate(time.year, time.month).monthLong}/${time.year}`}  
            />
            <WeekDaysHeader/>
            <Month {...time}/>
        </div>
    )
}