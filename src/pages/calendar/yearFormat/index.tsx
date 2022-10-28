import { MonthNumbers } from "luxon/src/datetime"
import { useState } from "react"
import { CalendarHeader } from "../../../components/calendarHeader"
import { Month } from "../../../components/month"
import { GetDate } from "../../../utils/getDate"


export function YearFormat() {
    const [year, setYear] = useState<number>(GetDate().year)

    const months: MonthNumbers[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    return (
        <div className="flex items-center justify-center flex-col h-full w-full">
            <CalendarHeader
                lastItem={() => setYear(GetDate(year).plus({ year: -1 }).year)}
                nextItem={() => setYear(GetDate(year).plus({ year: 1 }).year)}
                value={year.toString()}
            />
            <ul className="grid grid-cols-4 grid-rows-3 w-full flex-1 overflow-hidden" >
                {
                    months.map((month, index) => {
                        return (
                            <li key={index} className="w-full h-full flex flex-col" >
                                <div className="bg-slate-600 w-full justify-between items-center border-2 border-solid border-slate-800">
                                    <h3 className='text-slate-200 text-center'>{GetDate(year, month).monthLong}</h3>
                                </div>
                                <Month month={month} year={year} format="year" />
                            </li >
                        )
                    })
                }
            </ul>
        </div>
    )
}
