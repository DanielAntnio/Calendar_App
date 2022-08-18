import { GetDate } from "../getDate";
import { Week } from "../week";
import { MonthFormatProps, Time } from '../../types'

export function Month({ month, year, showYear = false }: MonthFormatProps) {
    let timeVal = { month, year, day: 1 }

    let weekday = GetDate(timeVal.year, timeVal.month, timeVal.day).weekday
    let daysInMonth = GetDate(timeVal.year, timeVal.month, timeVal.day).daysInMonth
    let isSaturday = weekday === 6
    let isSixWeeks = (isSaturday && daysInMonth >= 30) || (weekday === 5 && daysInMonth === 31) ? 8 : 1

    let count = weekday === 7 ? 6 : 6 - weekday

    timeVal = !isSaturday 
    ? {
        day: GetDate(timeVal.year, timeVal.month, timeVal.day).plus({ day: count }).day,
        month: GetDate(timeVal.year, timeVal.month, timeVal.day).plus({ day: count }).month,
        year: GetDate(timeVal.year, timeVal.month, timeVal.day).plus({ day: count }).year,
    }
    : timeVal

    let weeks: Time[] = [] 
    
    for(let stday = 0; stday < daysInMonth + isSixWeeks; stday += 7){
        weeks.push(
            {
                day: GetDate(timeVal.year, timeVal.month, timeVal.day).plus({ day: stday }).day,
                month: GetDate(timeVal.year, timeVal.month, timeVal.day).plus({ day: stday }).month,
                year: GetDate(timeVal.year, timeVal.month, timeVal.day).plus({ day: stday }).year,
            }
        )
    }

    return (
        <ul className="flex flex-col flex-1 w-full bg-slate-900" >
            {
                weeks.map(function (time, index) {
                    let blank: false | "lastMonth" | "nextMonth" = index === 0 ? "nextMonth" : index === weeks.length - 1 ? "lastMonth" : false;

                    return (
                        <Week time={time} key={index} blankDays={blank} showYear={showYear} />
                    );
                })
            }
        </ul>
    )
} 