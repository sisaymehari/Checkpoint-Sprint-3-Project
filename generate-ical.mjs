import { writeFileSync } from "node:fs";
import { getEventsForYears } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };

const events = getEventsForYears(2020, 2030, daysData);
const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";

const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Days Calendar//EN"];

events.forEach(function (event) {
  lines.push(
    "BEGIN:VEVENT",
    `UID:${event.date}-${event.name.replaceAll(" ", "-")}@days-calendar`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${event.date.replaceAll("-", "")}`,
    `SUMMARY:${event.name}`,
    "END:VEVENT",
  );
});

lines.push("END:VCALENDAR");
writeFileSync("days.ics", lines.join("\r\n") + "\r\n");