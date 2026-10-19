export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const OCCURRENCES = ["first", "second", "third", "fourth"];

export function getDayOfMonth(year, monthName, dayName, occurrence) {
  const month = MONTH_NAMES.indexOf(monthName);
  const weekday = DAY_NAMES.indexOf(dayName);

  if (occurrence === "last") {
    const lastDate = new Date(Date.UTC(year, month + 1, 0));
    const daysBack = (lastDate.getUTCDay() - weekday + 7) % 7;
    return lastDate.getUTCDate() - daysBack;
  }

  const firstWeekday = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysForward = (weekday - firstWeekday + 7) % 7;
  return 1 + daysForward + 7 * OCCURRENCES.indexOf(occurrence);
}