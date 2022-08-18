export type ClassName = {
    className: string
}

export type ClassNameHidden = {
    Placeholder: "flex" | "hidden",
    Day:  "flex" | "hidden",
    Week:  "flex" | "hidden",
    Month:  "flex" | "hidden",
    Year:  "flex" | "hidden",
}

export type DayProps = {
    day: number,
    weekday?: string
    className?: string
    showYear?: boolean
}

export type HeaderProps =  {
    value: string,
    nextItem: Function,
    lastItem: Function
}

export type MonthFormatProps = {
    year: number,
    month: number,
    showYear?: boolean
}

export type DayFormatProps = {
    yearValue?: number
    monthValue?: number
    dayValue?: number
}

export type WeekProps = {
    time: Time
    blankDays?: false | "lastMonth" | "nextMonth"
    showWeekday?: boolean
    showYear?: boolean
}

export type weekDayProps = {
    day: number,
    weekday: string
}

export type Time = {
    day: number,
    month: number,
    year: number,
}

export type NavItems = {
    name: string;
}
