import { CalendarBlank } from "phosphor-react";
import { DayFormat } from "../screens/dayFormat";
import { MonthFormat } from "../screens/monthFormat";
import { WeekFormat } from "../screens/weekFormat";
import { YearFormat } from "../screens/yearFormat";
import { ClassNameHidden } from "../types";

export function CalendarFormat(display: ClassNameHidden) {
    return (
        <>
            <div className={`items-center justify-center opacity-70 flex-col ${display.Placeholder} `} >
                <CalendarBlank size={200} className="text-gray-900" />
                <p className="font-medium">Select a Calendar Format</p>
            </div>
            <DayFormat className={display.Day} />
            <WeekFormat className={display.Week} />
            <MonthFormat className={display.Month} />
            <YearFormat className={display.Year} />
        </>
    )
}