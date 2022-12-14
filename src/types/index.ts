// export type ClassName = string

import {
  DayNumbers,
  HourNumbers,
  MonthNumbers,
  SecondNumbers,
  WeekNumbers,
} from "luxon";

export type ShowCalendar = {
  Day: boolean;
  Week: boolean;
  Month: boolean;
  Year: boolean;
};

export type DayProps = {
  time: Time;
  className?: string;
  format: "day" | "week" | "month" | "year";
};

export type HeaderProps = {
  value: string;
  nextItem: Function;
  lastItem: Function;
  disableNext?: boolean;
  disableLast?: boolean;
};

export type MonthFormatProps = {
  year: number;
  month: MonthNumbers;
  format: "month" | "year";
};

export type DayFormatProps = {
  yearValue?: number;
  monthValue?: number;
  dayValue?: number;
};

export type WeekProps = {
  days: Time[];
  blankDays?: false | "lastMonth" | "nextMonth";
  showWeekday?: boolean;
  format: "week" | "month" | "year";
};

export type weekDayProps = {
  day: number;
  weekday: string;
};

export type Time = {
  year: number;
  month: MonthNumbers | number;
  day: DayNumbers | number;
};
export type Hour = {
  hour: HourNumbers | number;
  minute: SecondNumbers | number;
};

export type dayDate = {
  Day: Time;
  Hour: Hour;
};

export type Event = {
  id: string;
  title: string;
  color: string;
  start: string;
  end: string;
};

export type NewEvent = {
  title: string;
  color: string;
  start: string;
  end: string;
  userId: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  color: string;
  start: dayDate;
  end: dayDate;
};

export type DayEvent = {
  id: string;
  title: string;
  color: string;
  start: Time;
  end: Time;
};

export type Holiday = {
  name: string;
  date: string;
  type: string;
};
