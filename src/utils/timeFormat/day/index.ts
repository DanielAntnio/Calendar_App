import {  Time } from "../../../types"

export function DayTimeFormat(time: string) {
    const [ year, month, day ] = time.split("-")

    const date: Time = {
        day: parseInt(day),
        month: parseInt(month),
        year: parseInt(year)
    }
    return date
}