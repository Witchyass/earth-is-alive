import React, { useEffect, useState } from 'react';

export const Toast = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 4200);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!isVisible) return null;

  return (
    <div className={`toast ${!isVisible ? 'hidden' : ''}`}>
      <span>🌍</span>
      <span>{message}</span>
    </div>
  );
};
