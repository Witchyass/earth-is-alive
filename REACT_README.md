# Earth is Alive - React Seismic Monitor

A modern React application that displays real-time seismic activity data from Supabase with automatic re-rendering when new earthquakes are detected.

## Features

✨ **Real-time Data**: Automatically updates when new earthquakes are recorded in Supabase  
📍 **Interactive Map**: Leaflet-based map with earthquake markers and ripple effects  
📊 **Statistics Dashboard**: Live stats showing largest magnitude, total events, danger level, and average depth  
🌊 **Insights Section**: Analysis including most active regions, Ring of Fire statistics, and severity breakdown  
🔄 **Auto-rerender**: Uses useEffect and real-time subscriptions for instant updates  
🎨 **Beautiful Design**: Clean, modern UI with gradient accents and smooth animations  
📱 **Responsive**: Works on desktop, tablet, and mobile devices  

## Project Structure

```
src/
├── App.jsx                 # Main app component with useEffect hooks
├── index.js               # React entry point
├── index.css              # All styling (from original HTML)
├── components/
│   ├── Header.jsx         # Header with live status indicator
│   ├── Stats.jsx          # Statistics bar (4 stats)
│   ├── MapComponent.jsx   # Leaflet map with markers
│   ├── Feed.jsx           # Horizontal scrollable earthquake feed
│   ├── Insights.jsx       # Data analysis section
│   ├── Toast.jsx          # Toast notifications
│   ├── Footer.jsx         # Footer
│   └── index.js           # Component exports
└── utils/
    ├── supabase.js        # Supabase client & mock data fallback
    └── helpers.js         # Helper functions (formatting, checks)
public/
├── index.html             # HTML entry point
package.json              # Dependencies
.env.example              # Environment variables template
README.md                 # This file
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase (Optional)

If you have Supabase credentials:

1. Copy `.env.example` to `.env.local`
2. Add your Supabase URL and public API key:
   ```
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_KEY=your-public-api-key
   ```

**Note**: API keys are NOT displayed in the app. If the .env variables are missing, the app automatically uses mock data.

### 3. Run the App

```bash
npm start
```

The app will open at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## How It Works

### Data Flow

1. **Initial Load**: `useEffect` in `App.jsx` calls `fetchEarthquakes()` from Supabase
2. **Mock Data Fallback**: If Supabase is unavailable or keys are missing, mock data is generated randomly
3. **Real-time Subscription**: `subscribeToEarthquakes()` listens for INSERT events
4. **Auto-rerender**: When new earthquakes are detected:
   - Toast notification appears
   - `loadData()` is called
   - State updates trigger React re-render
   - Map updates with new markers
   - Stats and insights refresh

### Key Components

**App.jsx**
- `useEffect` for initial data fetch
- `useEffect` for realtime subscription
- State management for data, status, toasts

**MapComponent.jsx**
- Uses Leaflet with custom pulse pin icons
- Dynamically adds/removes markers based on data
- Handles map interactions

**Insights.jsx**
- Calculates statistics: Ring of Fire %, danger level, shallow quakes
- Generates dynamic narrative based on seismic activity
- Severity breakdown charts

**Toast.jsx**
- Displays notifications when new earthquakes are detected
- Auto-hides after 4.2 seconds

## Environment Variables

```
REACT_APP_SUPABASE_URL    # Your Supabase project URL
REACT_APP_SUPABASE_KEY    # Your Supabase public API key
```

If these are not set, the app uses **mock data** instead.

## Styling

All CSS is kept in `src/index.css` exactly as it was in the original HTML, organized into sections:

- Header & Navigation
- Stats Bar
- Map Container
- Feed Strip
- Insights & Cards
- Animations (float, blink, fadeUp, mapRipple, spin, etc.)
- Responsive Media Queries

## Data Schema (Expected from Supabase)

```javascript
{
  id: string,
  magnitude: number,
  place: string,
  depth_km: number,
  lat: number,
  lon: number,
  time: ISO string,
  severity: 'MAJOR' | 'STRONG' | 'MODERATE' | 'LIGHT',
  drama: string  // Poetic description of the event
}
```

## Color Scheme

- **MAJOR**: #e8420a (Lava)
- **STRONG**: #f5720a (Magma)
- **MODERATE**: #f5a623 (Ember)
- **LIGHT**: #4a9b6f (Moss)

## Technologies Used

- **React 18** - UI framework
- **Leaflet** - Interactive maps
- **@supabase/supabase-js** - Database & realtime subscriptions
- **CSS3** - Styling with animations
- **ES6+** - Modern JavaScript

## Features Explained

### Real-time Updates
The app subscribes to Supabase's `postgres_changes` on the earthquakes table. When n8n inserts a new record, a realtime event triggers, the UI is notified, and all sections update instantly.

### Mock Data
If Supabase is unavailable or credentials are missing, `utils/supabase.js` generates realistic random earthquake data with:
- Random magnitudes between 3.0 and 10.0
- Real-world earthquake locations
- Poetic drama descriptions
- Realistic depth values

### Auto-rerender on Change
React's dependency arrays in `useEffect` ensure:
1. Data is fetched once on mount
2. Realtime subscriptions listen for changes
3. When data changes, all components re-render automatically
4. Map markers update without page refresh

## Troubleshooting

**Blank map?**
- Wait for initial load (2-3 seconds)
- Check browser console for errors

**No data showing?**
- App should show mock data automatically
- Check `.env.local` file exists if using Supabase

**Realtime not working?**
- Ensure Supabase credentials are correct
- Check that the earthquakes table exists and has proper permissions

## Future Enhancements

- [ ] Filters by magnitude, location, time range
- [ ] Download data as CSV
- [ ] Custom map layers
- [ ] Alert notifications for major events
- [ ] Historical trend charts
- [ ] Dark mode toggle

## License

MIT

---

**Happy earthquake monitoring! 🌍**
