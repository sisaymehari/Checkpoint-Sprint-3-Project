import daysData from "./days.json" with { type: "json" };
import { MONTH_NAMES, DAY_NAMES } from "./common.mjs";
const calendar = document.querySelector("#calendar");

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();
let shownYear = currentYear;
let shownMonth = currentMonth;

const currentMonthName = MONTH_NAMES[currentMonth];

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

function makeNavButtons() {
  const prevNextDiv = document.createElement("div");
  prevNextDiv.classList.add("nav-buttons");

  const prevButton = document.createElement("button");
  prevButton.textContent = "Prev";
  prevButton.setAttribute("aria-label", "Previous month");
  prevNextDiv.appendChild(prevButton);
  prevButton.addEventListener("click", handlePrevClick);

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.setAttribute("aria-label", "Next month");
  prevNextDiv.appendChild(nextButton);
  nextButton.addEventListener("click", handleNextClick);

  calendar.before(prevNextDiv);
}

function handleNextClick() {
  shownMonth++;
  if (shownMonth > 11) {
    shownYear++;
    shownMonth = 0;
  }
}

function handlePrevClick() {
  shownMonth--;
  if (shownMonth < 0) {
    shownYear--;
    shownMonth = 11;
  }
}

window.onload = function () {
  showHeader(currentYear, currentMonthName);
  makeWeekDayBoxes();
  makeCalendarBoxes(currentYear, currentMonth);
  makeNavButtons();
};
