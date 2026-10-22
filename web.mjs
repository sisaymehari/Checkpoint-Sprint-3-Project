import daysData from "./days.json" with { type: "json" };
import { MONTH_NAMES, DAY_NAMES, getCommemorativeDays } from "./common.mjs";
const calendar = document.querySelector("#calendar");

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();

const state = {
  year: currentYear,
  month: currentMonth,
};

function showHeader(year, monthName) {
  const header = document.createElement("h1");
  calendar.appendChild(header);
  header.textContent = `${monthName} ${year}`;
}

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
    const specialDaysToday = specialDays.filter(
      (specialDay) => specialDay.day === dayNumber,
    );
    specialDaysToday.forEach((specialDay) => {
      const specialDayLabel = document.createElement("div");
      specialDayLabel.classList.add("special-day");
      specialDayLabel.textContent = specialDay.name;
      dayBox.appendChild(specialDayLabel);
    });
    boxesContainer.appendChild(dayBox);
  }
}

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

function handleNextClick() {
  state.month++;
  if (state.month > 11) {
    state.year++;
    state.month = 0;
  }
  render();
}

function handlePrevClick() {
  state.month--;
  if (state.month < 0) {
    state.year--;
    state.month = 11;
  }
  render();
}

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

function makeYearSelect() {
  const yearSelect = document.createElement("select");
  yearSelect.id = "year-select";
  yearSelect.setAttribute("aria-label", "Year");
  yearSelect.addEventListener("change", handleYearChange);
  return yearSelect;
}

function handleMonthChange() {
  const monthSelect = document.querySelector("#month-select");
  state.month = Number(monthSelect.value);
  render();
}

function handleYearChange() {
  const yearSelect = document.querySelector("#year-select");
  state.year = Number(yearSelect.value);
  render();
}

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

window.onload = function () {
  makeControls();
  render();
};
