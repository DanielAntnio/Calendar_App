import { DateTime } from "luxon";

export const GetDate = (
  year?:   number,
  month?:  number,
  day?:    number,
  hour?:   number,
  minute?: number,
  second?: number
) =>
  DateTime.local(
    year   === undefined ? DateTime.local().year   : year,
    month  === undefined ? DateTime.local().month  : month,
    day    === undefined ? DateTime.local().day    : day,
    hour   === undefined ? DateTime.local().hour   : hour,
    minute === undefined ? DateTime.local().minute : minute,
    second === undefined ? DateTime.local().second : second
  );
