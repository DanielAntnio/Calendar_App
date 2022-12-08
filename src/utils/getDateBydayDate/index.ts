import { dayDate } from "../../types";
import { GetDate } from "../getDate";

export function GetdateByDayDate(time: dayDate) {
    const { Day, Hour } = time
    const { year, month, day } = Day
    const { hour, minute} = Hour

    return GetDate(year, month, day, hour, minute)
}