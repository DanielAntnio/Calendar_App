import { dayDate } from "../../types";
import { GetTime } from "../getTime";

export function GetTimeByDayDate(date: dayDate) {
    const { Day, Hour } = date;
    const { year, month, day } = Day;
    const { hour, minute } = Hour;
    return GetTime(year, month, day, hour, minute);
  }