'use client';
import React, { useEffect, useRef, useState } from 'react';

interface YandexMapProps {
  location: { latitude: number; longitude: number };
  onLocationChange: (coords: { latitude: number; longitude: number }) => void;
  controls?: string[]; // Ixtiyoriy controls
}

const YandexMap: React.FC<YandexMapProps> = ({
  location,
  onLocationChange,
  controls = ['zoomControl', 'fullscreenControl'],
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    const loadYandexMap = () => {
      if (window.ymaps) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=b0593ac8-1693-490b-a9b2-4610b403a2f8&lang=ru_RU`;
      script.async = true;
      script.onload = () => window.ymaps.ready(initializeMap);
      document.body.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current) return;

      const map = new window.ymaps.Map(mapRef.current, {
        center: [location.latitude, location.longitude],
        zoom: 15,
        controls: controls,
      });

      setMapInstance(map);

      // Xarita ustida klik voqeasini qo'shish
      if (map.events && map.events.add) {
        map.events.add('click', (e: any) => {
          const coords = e.get('coords');
          if (coords) {
            onLocationChange({ latitude: coords[0], longitude: coords[1] });
            if (markerRef.current) {
              map.geoObjects.remove(markerRef.current);
            }

            // Yangi marker yaratish
            const newMarker = new window.ymaps.Placemark(
              coords,
              {
                hintContent: '_SELECTED_LOCATION_',
                balloonContent: `Coordinates: ${coords[0]}, ${coords[1]}`,
              },
              {
                iconColor: '#FF0000',
              }
            );

            map.geoObjects.add(newMarker);
            markerRef.current = newMarker;
          }
        });
      }
    };

    if (!mapInstance) {
      loadYandexMap();
    }
  }, [mapInstance, onLocationChange]);

  useEffect(() => {
    if (mapInstance && markerRef.current) {
      // Markerning joylashuvini yangilash
      markerRef.current.geometry.setCoordinates([
        location.latitude,
        location.longitude,
      ]);
    } else if (mapInstance) {
      // Agar marker hali mavjud bo'lmasa, yangi marker yaratish
      const newMarker = new window.ymaps.Placemark(
        [location.latitude, location.longitude],
        {
          hintContent: '_SELECTED_LOCATION_',
          balloonContent: `Coordinates: ${location.latitude}, ${location.longitude}`,
        },
        {
          iconColor: '#FF0000',
        }
      );
      mapInstance.geoObjects.add(newMarker);
      markerRef.current = newMarker; // Marker holatini yangilash
    }
  }, [location, mapInstance]);

  return (
    <div
      ref={mapRef}
      id="yandex-map"
      className="h-[250px] overflow-hidden 2xl:h-[400px]"
    />
  );
};

export default YandexMap;
