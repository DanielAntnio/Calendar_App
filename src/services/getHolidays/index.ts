import { Holiday, Time } from "../../types";
import { TwoDigitFormat } from "../../utils/TwoDigitFormat";

export async function GetHolidays(time: Time) {
  const url = `https://brasilapi.com.br/api/feriados/v1/${time.year}`;
  const DayString = `${time.year}-${TwoDigitFormat(time.month)}-${TwoDigitFormat(time.day)}`;

  const response = await fetch(url)
  const result: Holiday[] = await response.json()
  const data = result.filter((holiday: Holiday) => holiday.date === DayString)

  console.log(data)
      
  return data
}
