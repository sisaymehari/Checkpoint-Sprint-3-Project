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

export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const OCCURRENCES = ["first", "second", "third", "fourth"];

/*
  Finds the date of a rule like "second Tuesday of October" in a given year.
  Example: getDayOfMonth(2020, "October", "Tuesday", "second") 
  Returns → 13
 */
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
/*
  Lists the commemorative days of one month, with their dates in a given year.
  Example: getCommemorativeDays(2024, "October", daysData)
  Returns  → [{ name: "Ada Lovelace Day", day: 8 }, { name: "World Lemur Day", day: 25 }]
 */
export function getCommemorativeDays(year, monthName, days) {
  return days
    .filter((day) => day.monthName === monthName)
    .map((day) => ({
      name: day.name,
      day: getDayOfMonth(year, day.monthName, day.dayName, day.occurrence),
    }));
}
/*
  Lists every commemorative day for every year in a range, with full dates.
  Used by generate-ical.mjs to make the days.ics file.
  Example: getAllEvents(2020, 2030, daysData)
  Returns → [{ name: "Ada Lovelace Day", date: "2020-10-13" }, ...]
 */
export function getAllEvents(firstYear, lastYear, days) {
  const events = [];

  for (let year = firstYear; year <= lastYear; year++) {
    days.forEach(function (day) {
      const month = MONTH_NAMES.indexOf(day.monthName) + 1;
      const dayOfMonth = getDayOfMonth(
        year,
        day.monthName,
        day.dayName,
        day.occurrence,
      );
      events.push({
        name: day.name,
        date: `${year}-${String(month).padStart(2, "0")}-${String(
          dayOfMonth,
        ).padStart(2, "0")}`,
      });
    });
  }

  return events;
}
