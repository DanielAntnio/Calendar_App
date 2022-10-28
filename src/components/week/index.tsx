import { WeekProps } from '../../types'
import { Day } from '../day'

export const Week = ({ days, blankDays = false, format }: WeekProps
) =>
    <div className="flex flex-row flex-1 w-full">
        {
            days.map((day, index) => {
                const blank = blankDays === "nextMonth" && day.day > 20 || blankDays === "lastMonth" && day.day < 7

                return (
                    <Day
                        key={index}
                        time={day}
                        format={format}
                        className={`${format === 'year' ? "justify-center" : "p-4"} ${blank ? "opacity-40" : ""} flex ${format === 'month' ? "flex-col" : "flex-row"} hover:bg-slate-500/90 hover:dark:bg-slate-800/60 cursor-pointer dark:bg-slate-700 bg-slate-400 h-full w-full items-center border-[1px] border-solid dark:border-slate-900 border-slate-800`}
                    />
                )
            })
        }
    </div>