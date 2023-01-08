import { Query, DocumentData, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import Loading from "react-loading"
import { GetHolidays } from "../../services/getHolidays"
import { GetQuerry } from "../../services/getQuerry"
import { DayProps } from "../../types"
import { GetDate } from "../../utils/getDate"
import { GetTodayEvents } from "../../utils/getTodayEvents"

export function Day({ time, className, format }: DayProps) {
    const containerStyle = format !== "year" ? "rounded-md bg-slate-600/60 dark:bg-slate-800 h-8 w-12" : ""
    const margin = format !== "year" ? "text-zinc-100 m-4" : "text-slate-900"

    const weekday = () => {
        const { weekdayShort, weekdayLong } = GetDate(time.year, time.month, time.day)

        if (format === 'week')
            return <h5 className="m-1">{weekdayShort}</h5>
        if (format === 'day')
            return <h5 className="m-1">{weekdayLong}</h5>

        return null
    }

    const TwoDigitFormat = (value: number) => value > 9 ? value : '0' + value

    const [eventsLenght, setEventsLength] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        async function getEventsLength() {
            if (format === "month") {
                const q: Query<DocumentData> = GetQuerry()

                async function updateEvents() {
                    length = (await GetTodayEvents(time)).length + (await GetHolidays(time)).length
                    setEventsLength(length)
                }

                onSnapshot(q, updateEvents)
            } else setEventsLength(0)

            setIsLoading(false)
        }
        getEventsLength()
    }, [])

    function handleOpenDay() {
        if (format !== "day") window.location.pathname = `calendar/day/${TwoDigitFormat(time.day)}-${TwoDigitFormat(time.month)}-${time.year}`
    }

    return (
        <div className={className} onClick={handleOpenDay}>
            <div className={`flex items-center justify-center relative ${containerStyle}`}>
                <p className={`${margin} text-center`}>{time.day}</p>
                {
                    eventsLenght > 0 || isLoading ?
                        <span className="h-6 w-6 absolute -top-4 -right-5 rounded-full bg-slate-600 dark:bg-slate-900 text-white items-center flex justify-center text-xs m-2">
                            {isLoading ? <Loading type="spin" height={8} width={8} /> : eventsLenght}
                        </span>
                        : null
                }
            </div>
            {weekday()}
        </div>
    )
}