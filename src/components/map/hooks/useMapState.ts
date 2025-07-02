
import { useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

export function useMapState() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const [mapStyle, setMapStyle] = useState('streets-v11');
  const [showTraffic, setShowTraffic] = useState(false);
  const [showPOIs, setShowPOIs] = useState(true);

  return {
    mapContainer,
    map,
    mapLoaded,
    setMapLoaded,
    userMarker,
    mapStyle,
    setMapStyle,
    showTraffic,
    setShowTraffic,
    showPOIs,
    setShowPOIs,
  };
}
