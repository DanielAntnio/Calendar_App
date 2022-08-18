import { DayProps } from "../../types"

export function Day({ day, weekday, className, showYear = false }: DayProps) {
    let isWeekday = weekday !== undefined ? ( <h5 className="m-1">{weekday}</h5> ) : null

    let containerStyle = !showYear ? "rounded-md bg-slate-700 dark:bg-slate-500 h-8 w- 12" : " "
    let textColor = !showYear ? "text-zinc-100 m-4" : "text-slate-900"

    return (
        <div className={className}>
            <div className={`flex items-center justify-center ${containerStyle}`}>
                <p className={`${textColor} text-center`}>{day}</p>
            </div>
            {isWeekday}
        </div>
    )
}