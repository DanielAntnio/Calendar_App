import { GetHolidays } from "../../services/getHolidays"
import { DayProps } from "../../types"
import { GetDate } from "../../utils/getDate"
import { GetTodayEvents } from "../../utils/getTodayEvents"

export function Day({ time, className, format }: DayProps) {
    const containerStyle = format !== "year" ? "rounded-md bg-slate-600/60 dark:bg-slate-800 h-8 w-12" : ""
    const margin = format !== "year" ? "text-zinc-100 m-4" : "text-slate-900"

    const weekday = () => {
        const { weekdayShort, weekdayLong } = GetDate(time.year, time.month, time.day)

        if(format === 'week') 
            return <h5 className="m-1">{weekdayShort}</h5>
        if(format === 'day') 
            return <h5 className="m-1">{weekdayLong}</h5>

        return null
    }

    const TwoDigitFormat = (value: number) => value > 9 ? value : '0' + value  

    const eventsLenght = GetTodayEvents(time).length + GetHolidays(time).length

    function handleOpenDay() {
        if(format !== "day") window.location.pathname = `calendar/day/${TwoDigitFormat(time.day)}-${TwoDigitFormat(time.month)}-${time.year}`
    }

    return (
        <div className={className} onClick={handleOpenDay}>
            <div className={`flex items-center justify-center relative ${containerStyle}`}>
                <p className={`${margin} text-center`}>{time.day}</p>
                {
                format === "month" && eventsLenght > 0 ?
                    <span className="h-6 w-6 absolute -top-4 -right-5 rounded-full bg-slate-600 dark:bg-slate-900 text-white items-center flex justify-center text-xs m-2">
                        {eventsLenght}
                    </span>
                : null
            }
            </div>
            
            {weekday()}
            
        </div>
    )
}