import daysData from "./days.json" with { type: "json" };
import { MONTH_NAMES, DAY_NAMES } from "./common.mjs";
const calendar = document.querySelector("#calendar");

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();

const currentMonthName = MONTH_NAMES[currentMonth];

/*
  Shows the month and year as the page heading, e.g. "October 2026".
*/
function showHeader(year, monthName) {
  const header = document.createElement("h1");
  calendar.appendChild(header);
  header.textContent = `${monthName} ${year}`;
}
/*
  Shows the row of weekday names (Sunday to Saturday) above the calendar.
 */
function makeWeekDayBoxes() {
  const weekRow = document.createElement("div");
  weekRow.classList.add("week-row");
  calendar.appendChild(weekRow);

  DAY_NAMES.forEach((day) => {
    const weekDayBox = document.createElement("div");
    weekDayBox.textContent = day;
    weekDayBox.classList.add("week-day-box");
    weekRow.appendChild(weekDayBox);
  });
}

/*
  Shows one box per day of the month, with empty boxes before the 1st
  so that each day sits under the correct weekday.
  Month is 0-based (January = 0).
 */
function makeCalendarBoxes(year, month) {
  const boxesContainer = document.createElement("div");
  boxesContainer.classList.add("boxes-container");
  calendar.appendChild(boxesContainer);

  const emptyBoxCount = new Date(year, month, 1).getDay();
  const dayCount = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= emptyBoxCount; i++) {
    const emptyBox = document.createElement("div");
    emptyBox.classList.add("empty-box");
    boxesContainer.appendChild(emptyBox);
  }
  for (let i = 1; i <= dayCount; i++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("day-box");
    dayBox.textContent = i;
    boxesContainer.appendChild(dayBox);
  }
}

window.onload = function () {
  showHeader(currentYear, currentMonthName);
  makeWeekDayBoxes();
  makeCalendarBoxes(currentYear, currentMonth);
};
