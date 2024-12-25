// src/global.d.ts

interface YMaps {
  Map: new (element: string | HTMLElement, options: YMapOptions) => YMapInstance
  Placemark: new (
    coordinates: [number, number],
    properties: PlacemarkProperties,
    options: PlacemarkOptions
  ) => PlacemarkInstance
  ready: (callback: () => void) => void

  // Добавляем multiRouter для поддержки маршрутов
  multiRouter: {
    MultiRoute: new (
      options: MultiRouteOptions,
      params: MultiRouteParams
    ) => MultiRouteInstance
  }
}

interface YMapOptions {
  center: [number, number]
  zoom: number
  controls: string[]
}

interface YMapInstance {
  geoObjects: {
    add: (object: PlacemarkInstance | MultiRouteInstance) => void;
    remove: (object: PlacemarkInstance | MultiRouteInstance) => void; // remove metodi qo'shildi
  };
  events?: {
    add: (event: string, callback: Function) => void;
    remove: (event: string, callback: Function) => void;
  };
}


interface PlacemarkProperties {
  hintContent: string
  balloonContent: string
}

interface PlacemarkOptions {
  iconColor?: string;
  preset?: string; 
}

declare global {
  interface Window {
    ymaps: YMaps;
  }
}

interface MultiRouteOptions {
  referencePoints: [number, number][]
  params?: {
    routingMode?: 'auto' | 'masstransit' | 'bicycle' | 'pedestrian'
  }
}

interface MultiRouteParams {
  boundsAutoApply?: boolean
  routeActiveStrokeWidth?: number
  routeActiveStrokeColor?: string
}

interface MultiRouteInstance {
  // Instance of a multiRouter route
  options: {
    set: (key: string, value: any) => void
  }
}

interface Window {
  ymaps: YMaps
}

interface Window {
  OneSignalDeferred?: Array<(OneSignal: OneSignalInterface) => void>
}

interface OneSignalInterface {
  init: (config: OneSignalConfig) => Promise<void>
}

interface OneSignalConfig {
  appId: string
  safari_web_id?: string
  notifyButton?: {
    enable: boolean
  }
}

interface YandexMapProps {
  location: { latitude: number; longitude: number };
  onLocationChange: (coords: { latitude: number; longitude: number }) => void;
  controls?: string[]; // Ixtiyoriy controls
}

declare module 'yandex-maps' {
  export const ymaps: any;
}
