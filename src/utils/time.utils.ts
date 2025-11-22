import { Weekday } from "@prisma/client";

export function convertHourToMinutes(timeString: string): number {
  const [hours, minutes] = timeString.split(":").map(Number);

  return hours * 60 + minutes;
}

export function getMinutesFromDate(date: Date): number {
  return date.getUTCHours() * 60 + date.getUTCMinutes();
}

export function getWeekdayFromDate(date: Date): Weekday {
  const dayIndex = date.getUTCDay();
  const days: Weekday[] = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  return days[dayIndex];
}
