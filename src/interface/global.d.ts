declare global {
  interface Window {
    ymaps: YMaps;
    ymapsInitialized?: boolean;
    ymapsLoading?: boolean;
  }
}

interface YMaps {
  Map: new (
    element: string | HTMLElement,
    options: YMapOptions
  ) => YMapInstance;
  Placemark: new (
    coordinates: [number, number],
    properties: PlacemarkProperties,
    options: PlacemarkOptions
  ) => PlacemarkInstance;
  ready: (callback: () => void) => void;
  multiRouter: {
    MultiRoute: new (
      options: MultiRouteOptions,
      params: MultiRouteParams
    ) => MultiRouteInstance;
  };
}

interface YMapOptions {
  center: [number, number];
  zoom: number;
  controls: string[];
}

interface YMapInstance {
  geoObjects: {
    add: (object: PlacemarkInstance | MultiRouteInstance) => void;
    remove: (object: PlacemarkInstance | MultiRouteInstance) => void;
  };
  events?: {
    add: (event: string, callback: (event: any) => void) => void;
    remove: (event: string, callback: (event: any) => void) => void;
  };
}

interface PlacemarkProperties {
  hintContent: string;
  balloonContent: string;
}

interface PlacemarkOptions {
  iconColor?: string;
  preset?: string;
}

interface MultiRouteOptions {
  referencePoints: [number, number][];
  params?: {
    routingMode?: 'auto' | 'masstransit' | 'bicycle' | 'pedestrian';
  };
}

interface MultiRouteParams {
  boundsAutoApply?: boolean;
  routeActiveStrokeWidth?: number;
  routeActiveStrokeColor?: string;
}

interface MultiRouteInstance {
  options: {
    set: (key: string, value: any) => void;
  };
}

export {};
