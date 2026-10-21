import assert from "node:assert";
import test from "node:test";
import { getEventsForYears, getDateFromRule, getCommemorativeDays } from "./common.mjs";
import daysData from "./days.json" with { type: "json" };
test("finds the second Tuesday of October", () => {
  assert.equal(getDateFromRule(2024, "October", "Tuesday", "second"), 8);
  assert.equal(getDateFromRule(2020, "October", "Tuesday", "second"), 13);
});

test("finds the last Friday of October", () => {
  assert.equal(getDateFromRule(2024, "October", "Friday", "last"), 25);
  assert.equal(getDateFromRule(2020, "October", "Friday", "last"), 30);
});

test("finds the second Saturday of May 2030", () => {
  assert.equal(getDateFromRule(2030, "May", "Saturday", "second"), 11);
});

test("works when the 1st or the last day is the weekday we want", () => {
  assert.equal(getDateFromRule(2024, "October", "Tuesday", "first"), 1);
  assert.equal(getDateFromRule(2025, "October", "Friday", "last"), 31);
});

test("lists the special days of one month", () => {
  assert.deepEqual(getCommemorativeDays(2024, "October", daysData), [
    { name: "Ada Lovelace Day", day: 8 },
    { name: "World Lemur Day", day: 25 },
  ]);
});

test("makes one event per day per year", () => {
  const events = getEventsForYears(2020, 2030, daysData);
  assert.equal(events.length, daysData.length * 11);
  assert.deepEqual(events[0], { name: "Ada Lovelace Day", date: "2020-10-13" });
});

test("finds Ada Lovelace Day in October 2025", () => {
  assert.equal(getDateFromRule(2025, "October", "Tuesday", "second"), 14);
});

test("shows a day that was added to the data file", () => {
  const dawnChorusDay = {
    name: "International Dawn Chorus Day",
    monthName: "May",
    dayName: "Sunday",
    occurrence: "first",
  };
  assert.deepEqual(getCommemorativeDays(2025, "May", [dawnChorusDay]), [
    { name: "International Dawn Chorus Day", day: 4 },
  ]);
});