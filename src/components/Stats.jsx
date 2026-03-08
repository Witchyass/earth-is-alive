import React from 'react';

export const Stats = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="stats-bar">
        <div className="sc"><div className="sn">—</div><div className="sl">Largest magnitude</div><span className="si">📡</span></div>
        <div className="sc"><div className="sn">—</div><div className="sl">Total events</div><span className="si">🌐</span></div>
        <div className="sc"><div className="sn">—</div><div className="sl">Major + Strong</div><span className="si">⚡</span></div>
        <div className="sc"><div className="sn">—</div><div className="sl">Avg depth (km)</div><span className="si">🌋</span></div>
      </div>
    );
  }

  const maxM = Math.max(...data.map(q => q.magnitude));
  const danger = data.filter(q => ['MAJOR', 'STRONG'].includes(q.severity)).length;
  const avgD = (data.reduce((a, q) => a + (q.depth_km || 0), 0) / data.length).toFixed(0);

  return (
    <div className="stats-bar">
      <div className="sc">
        <div className="sn">M{maxM}</div>
        <div className="sl">Largest magnitude</div>
        <span className="si">📡</span>
      </div>
      <div className="sc">
        <div className="sn">{data.length}</div>
        <div className="sl">Total events</div>
        <span className="si">🌐</span>
      </div>
      <div className="sc">
        <div className="sn">{danger}</div>
        <div className="sl">Major + Strong</div>
        <span className="si">⚡</span>
      </div>
      <div className="sc">
        <div className="sn">{avgD} km</div>
        <div className="sl">Avg depth (km)</div>
        <span className="si">🌋</span>
      </div>
    </div>
  );
};
