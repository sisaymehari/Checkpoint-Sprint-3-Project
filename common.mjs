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

// The position of each word = how many weeks to jump from the first match.
// "last" is not in this list: it is handled separately, by counting backward.
const OCCURRENCES = ["first", "second", "third", "fourth"];

// Finds the day of the month for a rule like "second Tuesday of October".
// Takes the year, month name, weekday name and occurrence ("first" to "fourth or last").
// Uses UTC dates so clock changes (summer time) can never move the date by one day.
// Returns the day number (1-31).
export function getDateFromRule(year, monthName, dayName, occurrence) {
  const month = MONTH_NAMES.indexOf(monthName);
  const targetWeekday = DAY_NAMES.indexOf(dayName);
  if (occurrence === "last") {
    const lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0));
    const daysBack = (lastDayOfMonth.getUTCDay() - targetWeekday + 7) % 7;
    return lastDayOfMonth.getUTCDate() - daysBack;
  }
  const weekdayOfThe1st = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysForward = (targetWeekday - weekdayOfThe1st + 7) % 7;
  return 1 + daysForward + 7 * OCCURRENCES.indexOf(occurrence);
}

// Finds the special days in ONE month of a year.
// Takes the year, month name and the rules from days.json.
// Returns [{ name, day }], e.g. [{ name: "Ada Lovelace Day", day: 8 }], or [] if none.
export function getCommemorativeDays(year, monthName, dayRules) {
  return dayRules
    .filter((rule) => rule.monthName === monthName)
    .map((rule) => ({
      name: rule.name,
      day: getDateFromRule(year, rule.monthName, rule.dayName, rule.occurrence),
    }));
}

// Lists every special day in EVERY month from firstYear to lastYear.
// Takes the first year, last year and the rules from days.json.
// Returns [{ name, date }], e.g. [{ name: "Ada Lovelace Day", date: "2020-10-13" }, ...].
export function getEventsForYears(firstYear, lastYear, dayRules) {
  const events = [];
  for (let year = firstYear; year <= lastYear; year++) {
    dayRules.forEach(function (rule) {
      const monthNumber = MONTH_NAMES.indexOf(rule.monthName) + 1; // 1-based for the date text (October = 10)
      const dayOfMonth = getDateFromRule(
        year,
        rule.monthName,
        rule.dayName,
        rule.occurrence,
      );
      events.push({
        name: rule.name,
        date: `${year}-${String(monthNumber).padStart(2, "0")}-${String(
          dayOfMonth,
        ).padStart(2, "0")}`,
      });
    });
  }
  return events;
}
