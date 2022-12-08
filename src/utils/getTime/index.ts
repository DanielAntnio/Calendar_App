import { dayDate } from "../../types";
import { GetDate } from "../getDate";

export const GetTime = (
  year?: number,
  month?: number,
  day?: number,
  hour?: number,
  minute?: number,
  second?: number
) =>
  GetDate(
    year === undefined ? 0 : year,
    month === undefined ? 0 : month,
    day === undefined ? 0 : day,
    hour === undefined ? 0 : hour,
    minute === undefined ? 0 : minute,
    second === undefined ? 0 : second
  )
    .toJSDate()
    .getTime();
