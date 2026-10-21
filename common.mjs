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

export function getCommemorativeDays(year, monthName, dayRules) {
  return dayRules
    .filter((rule) => rule.monthName === monthName)
    .map((rule) => ({
      name: rule.name,
      day: getDateFromRule(year, rule.monthName, rule.dayName, rule.occurrence),
    }));
}

export function getEventsForYears(firstYear, lastYear, dayRules) {
  const events = [];

  for (let year = firstYear; year <= lastYear; year++) {
    dayRules.forEach(function (rule) {
      const monthNumber = MONTH_NAMES.indexOf(rule.monthName) + 1;
      const dayOfMonth = getDateFromRule(
        year,
        rule.monthName,
        rule.dayName,
        rule.occurrence
      );
      events.push({
        name: rule.name,
        date: `${year}-${String(monthNumber).padStart(2, "0")}-${String(
          dayOfMonth
        ).padStart(2, "0")}`,
      });
    });
  }

  return events;
}
