import daysData from "./days.json" with { type: "json" };
import { MONTH_NAMES, DAY_NAMES, getCommemorativeDays } from "./common.mjs";

const calendar = document.querySelector("#calendar");

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();

// The month and year currently shown on screen (month is 0-based: January = 0).
// Every button click or dropdown change updates this, then calls render().
const state = {
  year: currentYear,
  month: currentMonth,
};

// Shows the month and year as the page heading, e.g. "October 2026".
function showHeader(year, monthName) {
  const header = document.createElement("h1");
  calendar.appendChild(header);
  header.textContent = `${monthName} ${year}`;
}

// Shows the row of weekday names (Sunday to Saturday) above the day boxes.
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

// Shows one box per day of the month, with empty boxes before the 1st so each day
// sits under the right weekday. Adds the names of any commemorative days to their boxes.
// Month is 0-based (January = 0).
function makeDayBoxes(year, month) {
  const boxesContainer = document.createElement("div");
  boxesContainer.classList.add("boxes-container");
  calendar.appendChild(boxesContainer);
  const emptyBoxCount = new Date(year, month, 1).getDay();
  const dayCount = new Date(year, month + 1, 0).getDate();
  const specialDays = getCommemorativeDays(year, MONTH_NAMES[month], daysData);
  for (let i = 1; i <= emptyBoxCount; i++) {
    const emptyBox = document.createElement("div");
    emptyBox.classList.add("empty-box");
    boxesContainer.appendChild(emptyBox);
  }
  for (let dayNumber = 1; dayNumber <= dayCount; dayNumber++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("day-box");
    dayBox.textContent = dayNumber;
    const specialDay = specialDays.find(
      (specialDay) => specialDay.day === dayNumber,
    );
    if (specialDay) {
      const specialDayLabel = document.createElement("div");
      specialDayLabel.classList.add("special-day");
      specialDayLabel.textContent = specialDay.name;
      dayBox.appendChild(specialDayLabel);
    }
    boxesContainer.appendChild(dayBox);
  }
}

// Builds the Previous and Next buttons. The aria-labels give screen readers the full
// names ("Previous month", "Next month").
function makeNavButtons() {
  const navButtons = document.createElement("div");
  navButtons.classList.add("nav-buttons");
  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  prevButton.setAttribute("aria-label", "Previous month");
  navButtons.appendChild(prevButton);
  prevButton.addEventListener("click", handlePrevClick);
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.setAttribute("aria-label", "Next month");
  navButtons.appendChild(nextButton);
  nextButton.addEventListener("click", handleNextClick);
  return navButtons;
}

// Moves forward one month. After December, goes to January of the next year.
function handleNextClick() {
  state.month++;
  if (state.month > 11) {
    state.year++;
    state.month = 0;
  }
  render();
}

// Moves back one month. Before January, goes to December of the previous year.
function handlePrevClick() {
  state.month--;
  if (state.month < 0) {
    state.year--;
    state.month = 11;
  }
  render();
}

// Builds the month dropdown. Each option's value is the month number (January = 0),
// so it can go straight into state.month.
function makeMonthSelect() {
  const monthSelect = document.createElement("select");
  monthSelect.id = "month-select";
  monthSelect.setAttribute("aria-label", "Month");
  MONTH_NAMES.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthSelect.appendChild(option);
  });
  monthSelect.addEventListener("change", handleMonthChange);
  return monthSelect;
}

// Fills the year dropdown with 100 years before and after the shown year.
// The list is rebuilt around the shown year every time, so the shown year is always
// in it, even after going past any fixed limit with Previous/Next.
function fillYearOptions() {
  const yearSelect = document.querySelector("#year-select");
  yearSelect.innerHTML = "";

  const firstYear = state.year - 100;
  const lastYear = state.year + 100;
  for (let year = firstYear; year <= lastYear; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }
}

// Builds the empty year dropdown. Its options are added by fillYearOptions().
function makeYearSelect() {
  const yearSelect = document.createElement("select");
  yearSelect.id = "year-select";
  yearSelect.setAttribute("aria-label", "Year");
  yearSelect.addEventListener("change", handleYearChange);
  return yearSelect;
}

// Jumps to the month picked in the dropdown. Number() is needed because
// dropdown values are always text.
function handleMonthChange() {
  const monthSelect = document.querySelector("#month-select");
  state.month = Number(monthSelect.value);
  render();
}

// Jumps to the year picked in the dropdown.
function handleYearChange() {
  const yearSelect = document.querySelector("#year-select");
  state.year = Number(yearSelect.value);
  render();
}

// Builds the dropdowns and buttons above the calendar. Called once, outside #calendar,
// so render() can redraw the calendar without deleting them.
function makeControls() {
  const controls = document.createElement("div");
  controls.classList.add("controls");
  const selects = document.createElement("div");
  selects.classList.add("selects");
  selects.appendChild(makeMonthSelect());
  selects.appendChild(makeYearSelect());
  controls.appendChild(selects);
  controls.appendChild(makeNavButtons());
  calendar.before(controls);
}

// Draws everything from the state: erases the calendar, redraws the heading, weekday
// row and day boxes, then makes the dropdowns show the same month and year.
function render() {
  calendar.innerHTML = "";
  showHeader(state.year, MONTH_NAMES[state.month]);
  makeWeekDayBoxes();
  makeDayBoxes(state.year, state.month);
  fillYearOptions();
  const yearSelect = document.querySelector("#year-select");
  yearSelect.value = state.year;
  const monthSelect = document.querySelector("#month-select");
  monthSelect.value = state.month;
}

// Builds the controls first, because render() needs the dropdowns to already exist.
window.onload = function () {
  makeControls();
  render();
};
