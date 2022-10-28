// export type ClassName = string

import { DayNumbers, HourNumbers, MonthNumbers, SecondNumbers } from "luxon"

export type ShowCalendar = {
    Day: boolean,
    Week: boolean,
    Month: boolean,
    Year: boolean,
}

export type DayProps = {
    time: Time,
    className?: string
    format: 'day' | 'week' | 'month' | 'year'
}

export type HeaderProps =  {
    value: string,
    nextItem: Function,
    lastItem: Function
}

export type MonthFormatProps = {
    year: number,
    month: MonthNumbers,
    format: 'month' | 'year'
}

export type DayFormatProps = {
    yearValue?: number
    monthValue?: number
    dayValue?: number
}

export type WeekProps = {
    days: Time[]
    blankDays?: false | "lastMonth" | "nextMonth"
    showWeekday?: boolean
    format: 'week' | 'month' | 'year'
}

export type weekDayProps = {
    day: number,
    weekday: string
}

export type Time = {
    year: number,
    month: MonthNumbers,
    day: DayNumbers
}
export type Hour = {
    hour: HourNumbers,
    minute: SecondNumbers
}

export type dayDate = {
    Day: Time
    Hour: Hour
}

export type Event = {
    id: string,
    tittle: string,
    color: string,
    start: string,
    end: string
}

export type NewEvent = {
    tittle: string,
    color: string,
    start: string,
    end: string,
    userId: string
}

export type CalendarEvent = {
    id: string,
    tittle: string,
    color: string,
    start: dayDate,
    end: dayDate
}