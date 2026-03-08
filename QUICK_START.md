# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Add Supabase Credentials (Optional)
Create a `.env.local` file in the project root:
```
REACT_APP_SUPABASE_URL=your_project_url
REACT_APP_SUPABASE_KEY=your_public_key
```

**Note**: This step is optional! The app works perfectly with mock data if you skip it.

### Step 3: Start the App
```bash
npm start
```

The app opens at `http://localhost:3000`

---

## 📊 What You'll See

1. **Header** - Live indicator (green = connected, yellow = connecting, red = disconnected)
2. **Stats Bar** - Largest magnitude, total events, danger count, average depth
3. **Interactive Map** - Click any earthquake card to zoom to that location
4. **Earthquake Feed** - Scroll horizontally to see recent events
5. **Insights Section** - Statistics, region rankings, narratives about seismic activity
6. **Footer** - Attribution and data source

---

## 🔄 Real-time Auto-update

The app refreshes automatically every time a new earthquake is detected in Supabase:

1. Supabase sends a realtime 'INSERT' event
2. A toast notification appears: "New earthquake detected: M5.2..."
3. All data refetches and all components re-render
4. Map updates with new markers
5. Stats and insights recalculate

No page refresh needed!

---

## 🎨 Features

✅ Uses mock data if Supabase is unavailable  
✅ Auto-hides API keys (never shown in code/console)  
✅ Responsive design (works on mobile)  
✅ Smooth animations and transitions  
✅ Real-time WebSocket subscriptions  
✅ Simple, clean component structure  

---

## 📝 Key Files

- **src/App.jsx** - Main app with useEffect hooks
- **src/components/** - Reusable React components
- **src/utils/supabase.js** - Supabase client with fallback to mock data
- **src/utils/helpers.js** - Utility functions
- **src/index.css** - All styling

---

## 🔧 Troubleshooting

**App shows mock data?**
- This is expected if you didn't add Supabase credentials
- Everything still works normally
- Add `.env.local` with your credentials to use real data

**Map not showing?**
- Wait a few seconds for initial load
- Check browser console (F12) for errors
- Ensure you're not blocking JavaScript

**No auto-updates?**
- Real-time requires valid Supabase credentials
- With mock data, refresh the page (F5) to see new data

---

## 🚢 Deploy to Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

Deploy to Vercel, Netlify, or any static host!

---

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Leaflet Maps](https://leafletjs.com/)

Enjoy! 🌍
