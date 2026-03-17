import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Stats } from './components/Stats';
import { MapComponent } from './components/MapComponent';
import { Feed } from './components/Feed';
import { Insights } from './components/Insights';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { fetchEarthquakes, subscribeToEarthquakes } from './utils/supabase';
import './index.css';

function App() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('CONNECTING');
  const [timestamp, setTimestamp] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [isMocked, setIsMocked] = useState(false);

  // Main data fetch function
  const loadData = async () => {
    const result = await fetchEarthquakes();
    if (result.data) {
      setData(result.data);
      setIsMocked(result.isMocked);
      setTimestamp('Updated ' + new Date().toLocaleTimeString());
      if (result.isMocked) {
        setStatus('DISCONNECTED');
        if (result.error) {
          setToastMessage('⚠️ Using mock data - Supabase unavailable');
        }
      } else {
        setStatus('LIVE');
      }
    }
  };

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  // Realtime subscription
  useEffect(() => {
    const unsubscribe = subscribeToEarthquakes((newQuake) => {
      // When new data arrives, refresh everything
      setToastMessage(
        `New earthquake detected: M${newQuake.magnitude} · ${newQuake.place} 🌍`
      );
      loadData();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Fly to map location
  const handleFlyTo = (lat, lon) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // The MapComponent will handle the actual map animation
  };

  return (
    <div>
      <Toast message={toastMessage} />
      <Header status={status} timestamp={timestamp} />
      <Stats data={data} />
      <MapComponent data={data} onFlyTo={handleFlyTo} />
      <Feed data={data} onCardClick={handleFlyTo} />
      <Insights data={data} />
      <Footer isMocked={isMocked} />
    </div>
  );
}

export default App;
