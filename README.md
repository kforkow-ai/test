# Vehicle Maintenance Workshops – Directory Website

A static directory website that lists registered vehicle maintenance workshops from `car/workshops.json`.

## Run locally

Serve the project root over HTTP (required so `car/workshops.json` loads correctly):

**Option A – npx (Node):**
```bash
npx serve .
```
Then open **http://localhost:3000**

**Option B – Python:**
```bash
python3 -m http.server 8080
```
Then open **http://localhost:8080**

**Option C – Ruby:**
```bash
ruby -run -e httpd . -p 8080
```
Then open **http://localhost:8080**

Do not open `index.html` as a file (`file:///...`) — the JSON won’t load.

## Deploy as static site

Upload the **whole project folder** so that:

- The site root has `index.html`
- The same root has a `car/` folder containing `workshops.json`

So the server serves:

- `https://your-domain.com/` → `index.html`
- `https://your-domain.com/car/workshops.json` → `car/workshops.json`

**Cloudflare Pages**

1. Connect your repo or upload the folder.
2. Build: leave **Build command** empty.
3. Output directory: **/** (root) or the folder that contains `index.html` and `car/`.

**Netlify / Vercel / GitHub Pages**

- Publish the folder that contains `index.html` and the `car/` directory as the site root. No build step needed.

## Regenerate JSON from CSV

When `registered_vehicle_maintenance_workshops.csv` changes:

```bash
ruby car/scripts/csv_to_json.rb
```

Then redeploy the site so `car/workshops.json` is updated.
