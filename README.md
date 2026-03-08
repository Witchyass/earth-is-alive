# 🌍 Earth is Alive

> *The planet never stops talking. This is the translator.*

A real-time global seismic activity dashboard — fully automated, zero cost, zero manual work.

Every 5 minutes, a pipeline fetches live earthquake data from USGS, classifies it, and pushes it to a database. A live dashboard reads the data, plots it on a world map, and tells the story behind the numbers.

---

## 🖥️ Live Demo

[earth-is-alive.netlify.app](https://earth-is-alive.netlify.app) <!-- replace with your URL -->

---

## ⚙️ How It Works

```
USGS API (free, no key)
    ↓  every 5 min
n8n workflow
    ↓  classifies + structures
Supabase (Postgres)
    ↓  Realtime WebSocket
index.html on Netlify
```

1. **n8n** runs on a cron schedule, fetches the USGS GeoJSON feed
2. A code node parses each earthquake, adds severity classification and a depth reading
3. An IF node filters to M4.5+ only
4. Records are upserted into Supabase (duplicates are ignored via `Prefer: resolution=merge-duplicates`)
5. The frontend is subscribed to Supabase Realtime — it updates **the instant n8n inserts a new row**, no polling

---

## 🗂️ Project Structure

```
earth-is-alive/
├── index.html                  # Full dashboard (map + feed + insights)
├── n8n/
│   └── earthquake_workflow.json  # Import this into your n8n instance
└── README.md
```

---

## 🚀 Setup

### 1. Supabase

Create a free project at [supabase.com](https://supabase.com) and run this SQL:

```sql
CREATE TABLE earthquakes (
  id          TEXT PRIMARY KEY,
  magnitude   FLOAT NOT NULL,
  place       TEXT,
  severity    TEXT,
  depth_km    FLOAT,
  lat         FLOAT,
  lon         FLOAT,
  time        TIMESTAMPTZ,
  drama       TEXT,
  usgs_url    TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE earthquakes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON earthquakes FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public select" ON earthquakes FOR SELECT TO anon USING (true);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE earthquakes;
```

### 2. n8n

- Import `n8n/earthquake_workflow.json` into your n8n instance
- Update the Supabase URL and anon key in the HTTP Request node headers
- Activate the workflow

### 3. Frontend

- Open `index.html` and replace `SUPA_URL` and `SUPA_KEY` with your own values
- Deploy to [Netlify Drop](https://app.netlify.com/drop) — just drag and drop the file 
---

## 🔌 Stack

| Tool | Role | Cost |
|------|------|------|
| [USGS NeoWs](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) | Real-time earthquake feed | Free, no key |
| [n8n](https://n8n.io) | Automation pipeline | Free (self-hosted) |
| [Supabase](https://supabase.com) | Postgres + REST API + Realtime | Free tier |
| [Leaflet.js](https://leafletjs.com) | Interactive map | Open source |
| [Netlify](https://netlify.com) | Static hosting | Free tier |

---

## 📊 Dashboard Features

- **Live world map** with pulsing color-coded markers per severity
- **Event feed** — horizontally scrollable, click any event to fly to it on the map
- **4 stat cards** — largest magnitude, total events, major+strong count, avg depth
- **6 insight cards** — most powerful event, most active region, shallow vs deep, danger level, most recent, Ring of Fire activity
- **Severity breakdown** — bar chart with percentages
- **Top 5 active regions** — ranked list
- **Narrative conclusion** — auto-generated paragraph that adapts based on the day's data
- **Realtime updates** — no refresh needed, updates the moment n8n runs



---

## 📡 USGS Feed Endpoints

```
# Used in production (last 24h, M4.5+)
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson

# For testing (last week)
https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson
```

---

## 🧠 Future Ideas

- [ ] Replace rule-based insights with LLM-generated narrative (Claude API)
- [ ] Email / Telegram alert for M7+ events
- [ ] Historical trend charts (7-day, 30-day)
- [ ] Tsunami risk flag based on depth + coastal proximity

---

