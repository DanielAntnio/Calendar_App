import { CalendarPlus } from "phosphor-react";
import { Holiday } from "../../../types";

type HolidayProps = {
    holiday: Holiday,
    index: number
}

export function HolidayHTML({ holiday, index }: HolidayProps) {
    return (
        <li
            className="m-2"
            key={index}
        >
            <div className="flex flex-col items-center justify-between p-2 rounded-xl bg-slate-400/40 dark:bg-slate-900/20">
                <div className="flex flex-row items-center">
                    <CalendarPlus size={32} />
                    <div className="h-6 w-2 rounded-full m-2 bg-purple-700" />
                    <p>{holiday.name}</p>
                </div>
                <legend className="ml-full mt-2 text-xs">Feriado</legend>
            </div>
        </li>
    )
}