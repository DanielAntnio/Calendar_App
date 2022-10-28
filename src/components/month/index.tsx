import { GetDate } from "../../utils/getDate";
import { Week } from "../week";
import { MonthFormatProps, Time } from '../../types'
import { GetWeekDays } from "../../utils/getWeekDays";

export function Month({ month, year, format }: MonthFormatProps) {
    let timeVal: Time = { month, year, day: 1 }

    const { weekday , daysInMonth } = GetDate(timeVal.year, timeVal.month, timeVal.day)
    const isSixWeeks = (weekday === 6 && daysInMonth >= 30) || (weekday === 5 && daysInMonth === 31) ? 8 : 1

    if(weekday !== 6) {
        const count = weekday === 7 ? 6 : 6 - weekday
        const { day, month, year } = GetDate(timeVal.year, timeVal.month, timeVal.day).plus({ day: count })
        timeVal = { day ,month, year }
    }
        
    let weeks: Time[] = [] 
    
    for(let stday = 0; stday < daysInMonth + isSixWeeks; stday += 7){
        const { day, month, year } = GetDate(timeVal.year, timeVal.month, timeVal.day).plus({ day: stday })
        weeks.push({ day ,month, year })
    }

    return (
        <div className="flex flex-col flex-1 w-full h-full bg-slate-900" >
            {
                weeks.map(function (time, index) {
                    const blank: false | "lastMonth" | "nextMonth" = index === 0 ? "nextMonth" : index === weeks.length - 1 ? "lastMonth" : false;

                    return (
                        <Week days={GetWeekDays(time)} key={index} blankDays={blank} format={format} />
                    );
                })
            }
        </div>
    )
} 
