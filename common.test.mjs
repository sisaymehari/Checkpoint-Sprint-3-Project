import assert from "node:assert";
import test from "node:test";
import { getDayOfMonth } from "./common.mjs";

test("finds the second Tuesday of October", () => {
  assert.equal(getDayOfMonth(2024, "October", "Tuesday", "second"), 8);
  assert.equal(getDayOfMonth(2020, "October", "Tuesday", "second"), 13);
});

test("finds the last Friday of October", () => {
  assert.equal(getDayOfMonth(2024, "October", "Friday", "last"), 25);
  assert.equal(getDayOfMonth(2020, "October", "Friday", "last"), 30);
});

test("finds the second Saturday of May 2030", () => {
  assert.equal(getDayOfMonth(2030, "May", "Saturday", "second"), 11);
});

test("works when the 1st or the last day is the weekday we want", () => {
  assert.equal(getDayOfMonth(2024, "October", "Tuesday", "first"), 1);
  assert.equal(getDayOfMonth(2025, "October", "Friday", "last"), 31);
});