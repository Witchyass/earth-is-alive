import React from 'react';

export const Header = ({ status, timestamp }) => {
  const getStatusClass = () => {
    if (status === 'LIVE') return '';
    if (status === 'CONNECTING') return 'connecting';
    return 'disconnected';
  };

  const getStatusLabel = () => {
    if (status === 'LIVE') return 'Live';
    if (status === 'CONNECTING') return 'Connecting…';
    return 'Disconnected';
  };

  return (
    <header className="header">
      <div className="logo">
        <div className="orb"></div>
        <div>
          <div className="logo-t">Earth is Alive</div>
          <div className="logo-s">Seismic Monitor</div>
        </div>
      </div>
      <div className="header-mid">
        Earth <em>is Alive</em>
      </div>
      <div className="header-r">
        <div className={`live-chip ${getStatusClass()}`}>
          <div className="live-dot"></div>
          <span>{getStatusLabel()}</span>
        </div>
        <span id="ts">{timestamp || '—'}</span>
      </div>
    </header>
  );
};
