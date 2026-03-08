import React from 'react';
import { timeAgo } from '../utils/helpers';

export const Feed = ({ data, onCardClick }) => {
  if (!data || data.length === 0) {
    return (
      <div className="feed-wrap">
        <div className="feed-hdr">
          <span className="feed-hdr-t">Recent Events — scroll →</span>
          <div className="feed-hdr-r">
            <div className="legend">
              <div className="leg">
                <div className="leg-dot" style={{ background: '#e8420a' }}></div>Major
              </div>
              <div className="leg">
                <div className="leg-dot" style={{ background: '#f5720a' }}></div>Strong
              </div>
              <div className="leg">
                <div className="leg-dot" style={{ background: '#f5a623' }}></div>Moderate
              </div>
              <div className="leg">
                <div className="leg-dot" style={{ background: '#4a9b6f' }}></div>Light
              </div>
            </div>
            <span className="feed-count">Loading…</span>
          </div>
        </div>
        <div className="feed-scroll">
          <div className="state-msg">
            <div className="spinner"></div>Fetching seismic data…
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feed-wrap">
      <div className="feed-hdr">
        <span className="feed-hdr-t">Recent Events — scroll →</span>
        <div className="feed-hdr-r">
          <div className="legend">
            <div className="leg">
              <div className="leg-dot" style={{ background: '#e8420a' }}></div>Major
            </div>
            <div className="leg">
              <div className="leg-dot" style={{ background: '#f5720a' }}></div>Strong
            </div>
            <div className="leg">
              <div className="leg-dot" style={{ background: '#f5a623' }}></div>Moderate
            </div>
            <div className="leg">
              <div className="leg-dot" style={{ background: '#4a9b6f' }}></div>Light
            </div>
          </div>
          <span className="feed-count">
            {data.length} event{data.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
      <div className="feed-scroll">
        {data.map((q, i) => (
          <div
            key={q.id || i}
            className={`qcard ${q.severity}`}
            style={{ animationDelay: `${i * 0.025}s` }}
            onClick={() => onCardClick(q.lat, q.lon)}
          >
            <div className="qpill">
              <div className="qpn">{q.magnitude}</div>
              <div className="qpm">MAG</div>
            </div>
            <div className="qi">
              <div className="qplace">{q.place}</div>
              <div className="qmeta">
                <span>⬇ {q.depth_km}km</span>
                <span>{timeAgo(q.time)}</span>
              </div>
              <div className="qdrama">"{q.drama}"</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
