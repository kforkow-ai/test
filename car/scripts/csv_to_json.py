#!/usr/bin/env python3
"""Convert registered_vehicle_maintenance_workshops.csv to JSON for fast loading."""

import csv
import json
from pathlib import Path

CSV_PATH = Path(__file__).resolve().parent.parent.parent / "registered_vehicle_maintenance_workshops.csv"
JSON_PATH = Path(__file__).resolve().parent.parent / "workshops.json"


def main():
    rows = []
    with open(CSV_PATH, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False)
    print(f"Wrote {len(rows)} workshops to {JSON_PATH}")


if __name__ == "__main__":
    main()
