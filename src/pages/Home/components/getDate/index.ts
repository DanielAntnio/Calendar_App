import { DateTime } from "luxon";

export let GetDate = (year?: number, month?: number, day?: number) => DateTime.local(
    year === undefined ? DateTime.local().year : year,
    month === undefined ? DateTime.local().month : month,
    day === undefined ? DateTime.local().day : day
);