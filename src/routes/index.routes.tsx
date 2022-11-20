import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AddReminder } from "../components/addReminder";
import { Aside } from "../components/aside";
import { isLogged } from "../services/isLogged";
import { AlertEvent } from "../utils/alertEvent";
import { GetDate } from "../utils/getDate";

const Home = lazy(() => import("../pages/calendar/Home").then(({ Home }) => ({ default: Home })))
const DayFormat = lazy(() => import("../pages/calendar/dayFormat").then(({ DayFormat }) => ({ default: DayFormat })))
const WeekFormat = lazy(() => import("../pages/calendar/weekFormat").then(({ WeekFormat }) => ({ default: WeekFormat })))
const MonthFormat = lazy(() => import("../pages/calendar/monthFormat").then(({ MonthFormat }) => ({ default: MonthFormat })))
const YearFormat = lazy(() => import("../pages/calendar/yearFormat").then(({ YearFormat }) => ({ default: YearFormat })))

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
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        <AddReminder />
      </main>
    </>
  )
}