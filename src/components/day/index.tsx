import { DayProps } from "../../types"
import { GetDate } from "../../utils/getDate"
import { GetTodayEvents } from "../../utils/getTodayEvents"

export function Day({ time, className, format }: DayProps) {
    const containerStyle = format !== "year" ? "rounded-md bg-slate-600/60 dark:bg-slate-800 h-8 w-12" : ""
    const margin = format !== "month" && format !== "year" ? "text-zinc-100 m-4" : "text-slate-900"

    const weekday = () => {
        const { weekdayShort, weekdayLong } = GetDate(time.year, time.month, time.day)

        if(format === 'week') 
            return <h5 className="m-1">{weekdayShort}</h5>
        if(format === 'day') 
            return <h5 className="m-1">{weekdayLong}</h5>

        return null
    }

    const TDF = (value: number) => value > 9 ? value : '0' + value //TwoDigitFormat  

    function handleOpenDay() {
        if(format === "day") return;
        window.location.pathname = `day/${TDF(time.day)}-${TDF(time.month)}-${time.year}`
    }

    return (
        <div className={className} onClick={handleOpenDay}>
            <div className={`flex items-center justify-center ${containerStyle}`}>
                <p className={`${margin} text-slate-900 dark:text-gray-100 text-center`}>{time.day}</p>
            </div>
            {weekday()}
            {
                format === "month" 
                ?  (
                    <ul className="flex flex-col justify-center items-center">
                        {
                            GetTodayEvents(time).map((event) => <div className="rounded-full h-0.5 w-20 m-0.5" style={{
                                backgroundColor: event.color
                            }} />)
                        }
                    </ul>
                ) : null 
            }
        </div>
    )
}