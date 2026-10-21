# Days Calendar

A calendar that shows commemorative days (like Ada Lovelace Day) on the right date for any month and year.

## Live site

https://sd-project-days-calendar.netlify.app

## How to run locally

Serve the folder over HTTP (e.g. with Live Server or `npx http-server`), then open `index.html`.
(Opening the file directly with `file://` does not work, because the page uses JavaScript modules.)

## Tests

```
npm i
npm test
```

## Make the iCal file

```
node generate-ical.mjs
```

This creates `days.ics` with every commemorative day from 2020 to 2030.

## Team

- shehu-dona: web calendar (grid, buttons, dropdowns, special days, accessibility)
- sisaymehari: date logic, unit tests, iCal generator

## Project brief

https://github.com/CodeYourFuture/Checkpoint/blob/main/Project-Days-Calendar/README.md
