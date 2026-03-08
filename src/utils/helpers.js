export const ROF = [
  'japan', 'chile', 'peru', 'alaska', 'indonesia',
  'philippines', 'new zealand', 'tonga', 'fiji',
  'vanuatu', 'solomon', 'papua', 'mexico', 'california',
  'kamchatka', 'taiwan', 'costa rica', 'ecuador',
  'colombia', 'pacific',
];

export const COLORS = {
  MAJOR: '#e8420a',
  STRONG: '#f5720a',
  MODERATE: '#f5a623',
  LIGHT: '#4a9b6f',
};

export const SIZES = {
  MAJOR: 20,
  STRONG: 14,
  MODERATE: 9,
  LIGHT: 6,
};

export const timeAgo = (isoString) => {
  const s = (Date.now() - new Date(isoString)) / 1000;
  if (s < 60) return Math.floor(s) + 's ago';
  if (s < 3600) return Math.floor(s / 60) + 'm ago';
  if (s < 86400) return Math.floor(s / 3600) + 'h ago';
  return Math.floor(s / 86400) + 'd ago';
};

export const extractRegion = (place) => {
  if (!place) return 'Unknown';
  return place.split(',').pop().trim();
};

export const isROF = (place) => {
  if (!place) return false;
  const pl = place.toLowerCase();
  return ROF.some((k) => pl.includes(k));
};
