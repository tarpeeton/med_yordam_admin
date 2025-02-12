const loadYandexMaps = (() => {
  let promise: Promise<void>;
  return () => {
    if (!promise) {
      promise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src =
          'https://api-maps.yandex.ru/2.1/?apikey=b0593ac8-1693-490b-a9b2-4610b403a2f8&lang=ru_RU';
        script.async = true;
        script.onload = () => {
          if (window.ymaps) {
            window.ymaps.ready(() => resolve());
          } else {
            reject(new Error('Yandex Maps API not available'));
          }
        };
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
    return promise;
  };
})();

export default loadYandexMaps;
