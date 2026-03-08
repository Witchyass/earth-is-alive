import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { COLORS, SIZES } from '../utils/helpers';

let mapInstance = null;

export const MapComponent = ({ data, onFlyTo }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Only initialize once
    if (!mapInstance) {
      mapInstance = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
      }).setView([20, 10], 2);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(mapInstance);

      // Inject ripple animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes mapRipple {
          0% { transform: scale(1); opacity: .5; }
          100% { transform: scale(4); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    // Clear existing markers
    mapInstance.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstance.removeLayer(layer);
      }
    });

    // Add new markers
    if (data && data.length > 0) {
      data.forEach((q) => {
        const c = COLORS[q.severity] || COLORS.LIGHT;
        const sz = SIZES[q.severity] || SIZES.LIGHT;

        const pulseIcon = L.divIcon({
          className: '',
          html: `<div style="position:relative;width:${sz * 2}px;height:${sz * 2}px;">
            <div style="position:absolute;inset:0;border-radius:50%;background:${c};opacity:.18;animation:mapRipple 2.6s ease-out infinite;"></div>
            <div style="position:absolute;inset:${sz * 0.28}px;border-radius:50%;background:${c};opacity:.9;box-shadow:0 2px 8px ${c}99;"></div>
            <div style="position:absolute;inset:${sz * 0.52}px;border-radius:50%;background:rgba(255,255,255,.5);"></div>
          </div>`,
          iconSize: [sz * 2, sz * 2],
          iconAnchor: [sz, sz],
        });

        const marker = L.marker([q.lat, q.lon], { icon: pulseIcon }).addTo(mapInstance);
        marker.bindPopup(`<div style="font-family:'Outfit',sans-serif;min-width:200px;padding:4px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
            <span style="font-family:'Playfair Display',serif;font-size:24px;font-weight:700;color:${c}">M${q.magnitude}</span>
            <span style="background:${c}18;color:${c};font-size:9px;padding:3px 9px;border-radius:8px;font-weight:600">${q.severity}</span>
          </div>
          <div style="font-size:12px;font-weight:600;color:#3d2b1f;margin-bottom:4px">${q.place}</div>
          <div style="font-size:10px;color:#a8947c;margin-bottom:8px">⬇ ${q.depth_km} km</div>
          <div style="font-family:'Playfair Display',serif;font-style:italic;font-size:11px;color:#7a5c42;border-top:1px solid #e8e0d5;padding-top:7px">"${q.drama}"</div>
        </div>`, { maxWidth: 240 });

        marker.addEventListener('click', () => {
          onFlyTo(q.lat, q.lon);
        });
      });
    }

    // Invalidate map size
    setTimeout(() => mapInstance?.invalidateSize(), 200);
  }, [data, onFlyTo]);

  return <div className="map-container" ref={mapRef}></div>;
};
