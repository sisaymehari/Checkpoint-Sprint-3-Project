// This is a placeholder file which shows how you can access functions and data defined in other files.
// It can be loaded into index.html.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getGreeting } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };
const calendar = document.querySelector("#calendar");

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();

const monthNames = [
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

const currentMonthString = monthNames[currentMonth];

function showHeader(year, month) {
  const header = document.createElement("h1");
  header.textContent = `${month} ${year}`;
  calendar.appendChild(header);
}
function makeCalendarBoxes(year, month) {
  const emptyBoxes = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 1; i <= emptyBoxes; i++) {
    const emptyBox = document.createElement("div");
    emptyBox.classList.add("empty-box");
    calendar.appendChild(emptyBox);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const dayBox = document.createElement("div");
    dayBox.classList.add("day-box");
    dayBox.textContent = i;
    calendar.appendChild(dayBox);
  }
}
window.onload = function () {
  showHeader(currentYear, currentMonthString);
  makeCalendarBoxes(currentYear, currentMonth);

  //   document.querySelector("body").innerText =
  //     `${getGreeting()} - there are ${daysData.length} known days`;
};
