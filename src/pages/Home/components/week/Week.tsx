import { weekDayProps, WeekProps } from '../../types'
import { Day } from '../day'
import { GetDate } from '../getDate'

export function Week({ time, blankDays = false, showWeekday = false, showYear = false }: WeekProps
) {
    let timeVal = time
    let weekday: number = GetDate(timeVal.year, timeVal.month, timeVal.day).weekday
 
    timeVal = weekday !== 7
    ? {
        day: GetDate(timeVal.year, timeVal.month, timeVal.day).plus({ day: -weekday }).day,
        month: GetDate(timeVal.year, time.month, timeVal.day).plus({ day: -weekday }).month,
        year: GetDate(timeVal.year, timeVal.month, timeVal.day).plus({ day: -weekday }).year,
    } : timeVal

    let weekDays: weekDayProps[] = []

    for(let getWeekDays = 0; getWeekDays < 7; getWeekDays++) {
        let OBJ = {
            day: GetDate(timeVal.year, timeVal.month, timeVal.day).plus({ day: getWeekDays }).day,
            weekday: GetDate(timeVal.year, timeVal.month, timeVal.day).plus({ day: getWeekDays }).weekdayShort
        }
        weekDays.push(OBJ)
    }

    return (
        <div className="flex flex-row flex-1 w-full">
            {
                weekDays.map((day, index) => {
                    let blank: string
                    blank = blankDays === "nextMonth" && day.day > 20
                        ? "opacity-40"
                        : blankDays === "lastMonth" && day.day < 7
                            ? "opacity-40"
                            : " "

                    let weekDay = showWeekday ? day.weekday : undefined

                    return (
                        <Day
                            key={index}
                            day={day.day}
                            weekday={weekDay}
                            showYear={showYear}
                            className={`${!showYear ? "p-4 hover:border-teal-500" : " "} flex flex-row dark:bg-slate-600 h-full w-full bg-slate-500 items-center justify-center border-2 border-solid border-slate-800 ${blank} `}
                        />
                    )
                })
            }
        </div>
    )
}