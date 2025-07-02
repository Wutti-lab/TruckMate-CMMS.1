
import { useState } from 'react';

export function useMapToken() {
  const [mapboxToken, setMapboxToken] = useState(
    localStorage.getItem('mapbox_token') || ''
  );
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [isSettingToken, setIsSettingToken] = useState(!localStorage.getItem('mapbox_token'));

  const handleTokenSubmit = () => {
    if (mapboxToken && mapboxToken.trim()) {
      localStorage.setItem('mapbox_token', mapboxToken);
      setIsSettingToken(false);
      setTokenError(null);
      return true;
    } else {
      setTokenError("Please enter a valid Mapbox token | กรุณาใส่ Mapbox token ที่ถูกต้อง");
      return false;
    }
  };

  const resetToken = () => {
    localStorage.removeItem('mapbox_token');
    setMapboxToken('');
    setIsSettingToken(true);
    setTokenError(null);
  };

  return {
    mapboxToken,
    setMapboxToken,
    tokenError,
    setTokenError,
    isSettingToken,
    setIsSettingToken,
    handleTokenSubmit,
    resetToken
  };
}
