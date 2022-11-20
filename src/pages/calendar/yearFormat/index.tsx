import { MonthNumbers } from "luxon/src/datetime"
import { useParams } from "react-router-dom"
import { CalendarHeader } from "../../../components/calendarHeader"
import { Month } from "../../../components/month"
import { GetDate } from "../../../utils/getDate"
import { TwoDigitFormat } from "../../../utils/twoDigitFormat"


export function YearFormat() {
    function GetTime() {
        const { timeval } = useParams()
        if (timeval == null) return GetDate().year
        if (timeval.length > 4 || isNaN(parseInt(timeval))) window.location.pathname = 'calendar/year'
        return GetDate(parseInt(timeval)).year
    }

    const year = GetTime()

    const months: MonthNumbers[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    function newYear(count: number){
        const yearval = GetDate(year).plus({ year: count }).year
        if (yearval == GetDate().year) return window.location.pathname = "calendar/year"
        window.location.pathname = `calendar/year/${yearval}`
    }

    return (
        <div className="flex items-center justify-center flex-col h-full w-full">
            <CalendarHeader
                lastItem={() => newYear(-1)}
                nextItem={() => newYear(1)}
                value={year.toString()}
            />
            <ul className="grid grid-cols-4 grid-rows-3 w-full flex-1 overflow-hidden" >
                {
                    months.map((month, index) => {
                        return (
                            <li key={index} className="w-full h-full flex flex-col" >
                                <div 
                                    className="bg-slate-500 dark:bg-slate-600 w-full justify-between items-center border-2 border-solid border-slate-600 dark:border-slate-900 hover:opacity-70 cursor-pointer"
                                    onClick={() => window.location.pathname = `/calendar/month/${TwoDigitFormat(month)}-${year}`}
                                >
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
