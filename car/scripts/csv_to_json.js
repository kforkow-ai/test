#!/usr/bin/env node
/**
 * Convert registered_vehicle_maintenance_workshops.csv to JSON for fast loading.
 * Run: node car/scripts/csv_to_json.js
 */

const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "../..");
const csvPath = path.join(projectRoot, "registered_vehicle_maintenance_workshops.csv");
const jsonPath = path.join(projectRoot, "car", "workshops.json");

function parseCSV(text) {
  const rows = [];
  let i = 0;
  while (i < text.length) {
    const row = [];
    while (i < text.length) {
      let cell = "";
      if (text[i] === '"') {
        i++;
        while (i < text.length) {
          if (text[i] === '"') {
            i++;
            if (text[i] === '"') {
              cell += '"';
              i++;
            } else break;
            }
          } else {
            cell += text[i++];
          }
        }
      } else {
        while (i < text.length && text[i] !== "," && text[i] !== "\n" && text[i] !== "\r") {
          cell += text[i++];
        }
      }
      row.push(cell);
      if (text[i] === ",") {
        i++;
        continue;
      }
      if (text[i] === "\n" || text[i] === "\r") {
        if (text[i] === "\r" && text[i + 1] === "\n") i++;
        i++;
        break;
      }
      if (i >= text.length) break;
    }
    if (row.length > 0 && row.some((c) => c !== "")) rows.push(row);
  }
  return rows;
}

const csvText = fs.readFileSync(csvPath, "utf8");
const lines = parseCSV(csvText);
const headers = lines[0];
const rows = lines.slice(1).map((cells) => {
  const obj = {};
  headers.forEach((h, i) => {
    obj[h] = cells[i] ?? "";
  });
  return obj;
});

fs.writeFileSync(jsonPath, JSON.stringify(rows), "utf8");
console.log(`Wrote ${rows.length} workshops to ${jsonPath}`);
