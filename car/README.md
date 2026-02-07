# Car directory – registered vehicle maintenance workshops

Data is converted from `registered_vehicle_maintenance_workshops.csv` to **`workshops.json`** for fast loading (no CSV parsing at runtime).

## Loading the data

```javascript
const workshops = require("./car/workshops.json");
// or
const workshops = await import("./car/workshops.json").then(m => m.default);
```

```python
import json
with open("car/workshops.json", encoding="utf-8") as f:
    workshops = json.load(f)
```

## Regenerating JSON from CSV

When the CSV is updated, regenerate the JSON:

**Ruby (no install):**
```bash
ruby car/scripts/csv_to_json.rb
```

**Node:**
```bash
npm run build:json
# or: node car/scripts/csv_to_json.js
```

**Python 3:**
```bash
python3 car/scripts/csv_to_json.py
```
