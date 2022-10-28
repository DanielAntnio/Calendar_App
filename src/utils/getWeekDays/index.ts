import { Time } from "../../types"
import { GetDate } from "../../utils/getDate"

export function GetWeekDays(time: Time) {
    let timeVal = time
    let weekday: number = GetDate(timeVal.year, timeVal.month, timeVal.day).weekday

    if(weekday !== 7) {
        const { day, month, year } = GetDate(timeVal.year, timeVal.month, timeVal.day).plus({ day: -weekday })
        timeVal = {day, month, year}
    }

    let weekDays: Time[] = []

    for(let getWeekDays = 0; getWeekDays < 7; getWeekDays++) {
        const { day, month, year } = GetDate(timeVal.year, timeVal.month, timeVal.day).plus({ day: getWeekDays })
        weekDays.push({day, month, year})
    }
    return weekDays
}