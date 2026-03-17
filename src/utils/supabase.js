import { createClient } from '@supabase/supabase-js';

const SUPA_URL = process.env.REACT_APP_SUPABASE_URL || '';
const SUPA_KEY = process.env.REACT_APP_SUPABASE_KEY || '';

// Initialize Supabase client (may fail if no credentials)
let supabase = null;
let isInitialized = false;

try {
  if (SUPA_URL && SUPA_KEY) {
    supabase = createClient(SUPA_URL, SUPA_KEY);
    isInitialized = true;
  }
} catch (error) {
  console.warn('Supabase initialization failed:', error);
}

// Mock data generator for fallback
export const generateMockData = () => {
  const places = [
    'Japan, Honshu',
    'Chile, Offshore Aisen',
    'Peru, Southern Peru',
    'Alaska, Southern Alaska',
    'Indonesia, Sumatra',
    'Philippines, Mindanao',
    'New Zealand, South Island',
    'Tonga, South of Fiji',
    'Fiji, Fiji Region',
    'Mexico, Jalisco',
  ];

  const dramas = [
    'The earth stirred beneath the waves',
    'A tremor whispered through the crust',
    'Tectonic plates settled with a deep rumble',
    'Magma spoke to the surface world',
    'The Ring of Fire crackled to life',
    'Continental plates shifted imperceptibly',
    'A deep-sea quake echoed into silence',
  ];

  const severities = ['MAJOR', 'STRONG', 'MODERATE', 'LIGHT'];

  return Array.from({ length: 15 }, (_, i) => ({
    id: `mock-${i}`,
    magnitude: (Math.random() * 7 + 3).toFixed(2),
    place: places[Math.floor(Math.random() * places.length)],
    depth_km: Math.floor(Math.random() * 600) + 10,
    lat: Math.random() * 180 - 90,
    lon: Math.random() * 360 - 180,
    time: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    severity: severities[Math.floor(Math.random() * severities.length)],
    drama: dramas[Math.floor(Math.random() * dramas.length)],
  })).sort((a, b) => new Date(b.time) - new Date(a.time));
};

// Fetch earthquakes from Supabase or mock data
export const fetchEarthquakes = async () => {
  try {
    if (!supabase || !isInitialized) {
      console.warn('Supabase not initialized, using mock data');
      return { data: generateMockData(), error: null, isMocked: true };
    }

    const { data, error } = await supabase
      .from('earthquakes')
      .select('*')
      .order('time', { ascending: false })
      .limit(200);

    if (error) {
      console.warn('Supabase fetch error:', error);
      return { data: generateMockData(), error: error.message, isMocked: true };
    }

    return { data: data || [], error: null, isMocked: false };
  } catch (error) {
    console.warn('Error fetching data:', error);
    return { data: generateMockData(), error: error.message, isMocked: true };
  }
};

// Subscribe to realtime earthquakes
export const subscribeToEarthquakes = (callback) => {
  if (!supabase || !isInitialized) {
    console.warn('Supabase not initialized, realtime subscription unavailable');
    return () => {};
  }

  try {
    const subscription = supabase
      .channel('earthquakes-live')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'earthquakes' },
        (payload) => {
          callback(payload.new);
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });

    return () => {
      supabase.removeChannel(subscription);
    };
  } catch (error) {
    console.warn('Realtime subscription error:', error);
    return () => {};
  }
};

export const getSupabaseStatus = () => ({
  isInitialized,
  hasCredentials: !!SUPA_URL && !!SUPA_KEY,
});
