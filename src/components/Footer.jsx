import React from 'react';

export const Footer = ({ isMocked }) => {
  return (
    <div className="footer">
      🌍 Earth is Alive · USGS Earthquake Hazards Program · Powered by n8n + Supabase
      {isMocked && ' · (Mock Data Mode)'}
    </div>
  );
};
