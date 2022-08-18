import { useState } from "react"
import { CalendarHeader } from "../../components/calendarHeader"
import { GetDate } from "../../components/getDate"
import { Year } from "../../components/year"
import { ClassName } from "../../types"

export function YearFormat ({className = " "}: ClassName) {
    const [ year, setYear ] = useState<number>(GetDate().year)

    function newYear(NoL: "last" | "next"): void {
        let count = NoL === "next" ? 1 : -1
        setYear(GetDate(year).plus({ year: count }).year)
    }

    return (
        <div className={`${className} h-full w-full items-center justify-center flex-col`}>
            <CalendarHeader 
                lastItem={() => newYear("last")}
                nextItem={() => newYear("next")}
                value={year.toString()}
            />
            <Year year={year} />
        </div>
    )
}