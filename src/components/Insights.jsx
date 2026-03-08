import React from 'react';
import { extractRegion, isROF } from '../utils/helpers';

export const Insights = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const strongest = data.reduce((a, b) => 
    a.magnitude > b.magnitude ? a : b
  );

  // Region count
  const rc = {};
  data.forEach(q => {
    const r = extractRegion(q.place);
    rc[r] = (rc[r] || 0) + 1;
  });
  const top = Object.entries(rc).sort((a, b) => b[1] - a[1])[0];

  // Shallow quakes
  const shallow = data.filter(q => q.depth_km <= 70).length;
  const shPct = Math.round((shallow / data.length) * 100);
  const avgD = (
    data.reduce((a, q) => a + (q.depth_km || 0), 0) / data.length
  ).toFixed(1);

  // Danger level
  const dangerous = data.filter(q =>
    ['MAJOR', 'STRONG'].includes(q.severity)
  ).length;
  const dPct = Math.round((dangerous / data.length) * 100);

  // Most recent
  const sorted = [...data].sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  // Ring of Fire
  const rofC = data.filter(q => isROF(q.place)).length;
  const rofPct = Math.round((rofC / data.length) * 100);

  // Severity breakdown
  const sc = { MAJOR: 0, STRONG: 0, MODERATE: 0, LIGHT: 0 };
  data.forEach(q => {
    if (sc[q.severity] !== undefined) sc[q.severity]++;
  });
  const mc = Math.max(...Object.values(sc));
  const bc = { MAJOR: '#e8420a', STRONG: '#f5720a', MODERATE: '#f5a623', LIGHT: '#4a9b6f' };

  // Narrative
  let title, body, pills;
  if (strongest.magnitude >= 7) {
    title = `A <em>major seismic event</em> shook the planet today.`;
    body = `In the last 24 hours, Earth recorded <strong>${data.length} earthquakes</strong> of M4.5 or higher. The most significant was a <strong>M${strongest.magnitude} in ${strongest.place}</strong>. <strong>${dangerous} events</strong> were Strong or Major (${dPct}%). The Ring of Fire accounted for <strong>${rofPct}%</strong> of all activity, and <strong>${top[0]}</strong> was the most affected region with ${top[1]} events.`;
    pills = [
      '🔴 Major event detected',
      '⚡ High activity',
      `🌊 Ring of Fire: ${rofPct}%`,
      `📍 Hotspot: ${top[0]}`,
    ];
  } else if (dPct > 15) {
    title = `Earth is <em>unusually active</em> right now.`;
    body = `<strong>${data.length} seismic events</strong> recorded globally, with ${dPct}% classified as Strong or higher. The strongest was a <strong>M${strongest.magnitude} near ${strongest.place}</strong>. <strong>${rofPct}%</strong> of activity originated along the Ring of Fire. The <strong>${top[0]}</strong> region led with ${top[1]} events. Average depth: ${avgD} km.`;
    pills = [
      '🟠 Elevated activity',
      `🌊 Ring of Fire: ${rofPct}%`,
      `📍 ${top[0]}`,
      '⏱️ Near real-time',
    ];
  } else if (dPct <= 5) {
    title = `A <em>quiet day</em> on the tectonic front.`;
    body = `With <strong>${data.length} events</strong> and only ${dangerous} Strong or Major, today is relatively calm. The strongest was <strong>M${strongest.magnitude} near ${strongest.place}</strong>. Ring of Fire contributed <strong>${rofPct}%</strong>. Even on quiet days the pipeline logs every tremor in near real-time.`;
    pills = [
      '🟢 Low activity',
      '✅ Normal range',
      `🌊 Ring of Fire: ${rofPct}%`,
      '📋 Continuous monitoring',
    ];
  } else {
    title = `<em>${data.length} earthquakes</em> recorded in the last 24 hours.`;
    body = `Activity falls within the normal range today. Strongest event: <strong>M${strongest.magnitude} near ${strongest.place}</strong>. <strong>${dangerous} events (${dPct}%)</strong> were Strong or Major. Ring of Fire contributed <strong>${rofPct}%</strong>. Most active region: <strong>${top[0]}</strong> with ${top[1]} events.`;
    pills = [
      `📊 ${data.length} events`,
      `🌊 Ring of Fire: ${rofPct}%`,
      `📍 ${top[0]}`,
      `⚡ ${dangerous} Strong/Major`,
    ];
  }

  return (
    <div className="insights">
      <div className="eyebrow">Data Insights</div>
      <h2 className="section-title">What the Earth is telling us</h2>
      <p className="section-sub">
        Every earthquake is a data point. Together they reveal patterns, hotspots,
        and stories about our living planet. Here's what the last 24 hours of seismic
        activity look like.
      </p>

      <div className="story-grid">
        <div className="scard danger">
          <span className="scard-icon">🔴</span>
          <div className="scard-title">Most Powerful Event</div>
          <div className="scard-val">M{strongest.magnitude}</div>
          <div className="scard-desc">{strongest.place}</div>
          <span className="scard-chip">⬇ Depth: {strongest.depth_km} km</span>
        </div>

        <div className="scard warning">
          <span className="scard-icon">🌏</span>
          <div className="scard-title">Most Active Region</div>
          <div className="scard-val">{top[1]}</div>
          <div className="scard-desc">
            events in the most seismically active zone right now.
          </div>
          <span className="scard-chip">📍 {top[0]}</span>
        </div>

        <div className="scard safe">
          <span className="scard-icon">📏</span>
          <div className="scard-title">Shallow Quakes</div>
          <div className="scard-val">{shPct}%</div>
          <div className="scard-desc">
            of events are shallow (≤70 km) — the kind most felt at the surface.
          </div>
          <span className="scard-chip">📊 Avg: {avgD} km</span>
        </div>

        <div className="scard ocean">
          <span className="scard-icon">⚡</span>
          <div className="scard-title">Danger Level</div>
          <div className="scard-val">{dPct}%</div>
          <div className="scard-desc">of events classified as Strong or Major.</div>
          <span className="scard-chip">
            {dPct > 20 ? '⚠️ Elevated' : '✅ Normal range'}
          </span>
        </div>

        <div className="scard warning">
          <span className="scard-icon">🕐</span>
          <div className="scard-title">Most Recent Event</div>
          <div className="scard-val">M{sorted[0].magnitude}</div>
          <div className="scard-desc">{sorted[0].place}</div>
          <span className="scard-chip">🕐 Just now</span>
        </div>

        <div className="scard safe">
          <span className="scard-icon">🌊</span>
          <div className="scard-title">Ring of Fire</div>
          <div className="scard-val">{rofC}</div>
          <div className="scard-desc">
            earthquakes along the Pacific Ring of Fire — the world's most active
            seismic belt.
          </div>
          <span className="scard-chip">🌊 {rofPct}% of all events</span>
        </div>
      </div>

      <div className="two-col">
        <div className="bcrd">
          <div className="bcrd-title">Severity Breakdown</div>
          {Object.entries(sc).map(([s, c]) => (
            <div key={s} className="bar-row">
              <div className="bar-lbl" style={{ color: bc[s] }}>
                {s}
              </div>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{
                    width: `${mc ? Math.round((c / mc) * 100) : 0}%`,
                    background: bc[s],
                  }}
                ></div>
              </div>
              <div className="bar-cnt">{c}</div>
              <div className="bar-pct">
                {data.length ? Math.round((c / data.length) * 100) : 0}%
              </div>
            </div>
          ))}
        </div>

        <div className="bcrd">
          <div className="bcrd-title">Most Active Regions</div>
          {Object.entries(rc)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([n, c], i) => (
              <div key={n} className="reg-row">
                <div className="reg-rank">{i + 1}</div>
                <div className="reg-name">{n}</div>
                <div style={{ textAlign: 'right' }}>
                  <div className="reg-cnt">{c}</div>
                  <div style={{ fontSize: '10px', color: 'var(--muted)' }}>
                    event{c !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="narrative">
        <div className="narr-eye">Conclusion</div>
        <h3 className="narr-title" dangerouslySetInnerHTML={{ __html: title }} />
        <p
          className="narr-body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <div className="narr-pills">
          {pills.map((p, i) => (
            <div key={i} className="npill">
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
