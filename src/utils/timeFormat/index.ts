import { dayDate } from "../../types"

type dayDatePlusString = dayDate & {
    stringDay: string
} 

export function TimeFormat(time: string) {
    const [ Day, Hour ] = time.split("T")
    const [ year, month, day ] = Day.split("-")
    const [ hour, minute ] = Hour.split(":")

    const date: dayDatePlusString = {
        Day: {
            day: parseInt(day),
            month: parseInt(month),
            year: parseInt(year)
        },
        Hour: {
            hour: parseInt(hour),
            minute: parseInt(minute)
        },
        stringDay: time
    }
    return date
}