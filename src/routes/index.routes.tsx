import { Routes, Route } from "react-router-dom";
import { AddReminder } from "../components/addReminder";
import { Aside } from "../components/aside";
import { DayFormat } from "../pages/calendar/dayFormat";
import { Home } from "../pages/calendar/Home";
import { MonthFormat } from "../pages/calendar/monthFormat";
import { WeekFormat } from "../pages/calendar/weekFormat";
import { YearFormat } from "../pages/calendar/yearFormat";
import { isLogged } from "../services/isLogged";
import { AlertEvent } from "../utils/alertEvent";
import { GetDate } from "../utils/getDate";

export function PageRoutes() {
  const { day, month, year } = GetDate()
  isLogged()
  AlertEvent({ day, month, year })

  return (
    <>
      <Aside />
      <main 
        id="main" 
        className="bg-slate-200 dark:bg-gray-700 flex-1 flex items-center justify-center flex-col relative"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="day" element={<DayFormat />} />
          <Route path="day/:timeval" element={<DayFormat />} />
          <Route path="week" element={<WeekFormat />} />
          <Route path="week/:timeval" element={<WeekFormat />} />
          <Route path="month" element={<MonthFormat />} />
          <Route path="month/:timeval" element={<MonthFormat />} />
          <Route path="year" element={<YearFormat />} />
          <Route path="year/:timeval" element={<YearFormat />} />
        </Routes>
        <AddReminder />
      </main>
    </>
  )
}