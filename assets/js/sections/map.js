import { mobChecker, script } from '../lib';
import MapPopup from '../ui/Popups/MapPopup';
import CallBackPopup from '../ui/Popups/CallBackPopup';

async function createMap(sectionID) {
  const point = [55.588618, 37.612632];
  const mapContainer = document.getElementById(sectionID);
  const mapsOptions = [{
    center: point,
    zoom: 17.46,
    controls: [],
  }, {
    mapAutoFocus: false,
    yandexMapAutoSwitch: false,
    yandexMapDisablePoiInteractivity: true,
    fullscreenZIndex: 0,
  }];
  const geoPointOptions = [
    {
      geometry: { type: 'Point', coordinates: point },
      properties: { iconContent: 'АвтоМагистр' },
    }, {
      iconShadow: true, preset: 'islands#redAutoIcon', draggable: false,
    }];
  const ymaps = await script('https://api-maps.yandex.ru/2.1/?apikey=e09c2ddb-b834-4721-9b8c-8519b529e938&lang=ru_RU')
    .then(() => global.ymaps);
  ymaps.ready(() => {
    const map = new ymaps.Map(mapContainer, ...mapsOptions);
    const geoPoint = new ymaps.GeoObject(...geoPointOptions);
    map.behaviors.disable(['scrollZoom', 'rightMouseButtonMagnifier', 'drag', 'dblClickZoom', 'multiTouch']);
    map.geoObjects.add(geoPoint);
  });
}

const mapSec = () => {
  import('../../less/2_plugins/YMap.less');

  const mapSecNode = document.querySelector('section.sec-map');
  const routeBtn = mapSecNode.querySelector('a.sec-map__route-btn');

  if (routeBtn) {
    routeBtn.addEventListener('click', () => {
      const popup = new MapPopup();
      popup.open();
    });
  }

  const navigatorBtn = mapSecNode.querySelector('a.sec-map__route-navigator');
  if (navigatorBtn) {
    navigatorBtn.classList.toggle('is-hidden', !mobChecker(0));
  }

  const callBtn = mapSecNode.querySelector('a.js-callback-me');
  if (callBtn) {
    callBtn.addEventListener('click', () => {
      const popup = new CallBackPopup();
      popup.open();
    });
  }

  if ('IntersectionObserver' in window) {
    const nodeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const node = entry.target;
          createMap('section-map').then(() => nodeObserver.unobserve(node));
        }
      });
    });
    nodeObserver.observe(mapSecNode);
    return;
  }

  let lazyloadThrottleTimeout;
  const lazyload = () => {
    if (lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }
    lazyloadThrottleTimeout = setTimeout(() => {
      const scrollTop = window.pageYOffset;
      if (mapSecNode.offsetTop < (window.innerHeight + scrollTop)) {
        createMap('section-map').then(() => {
          document.removeEventListener('scroll', lazyload);
          window.removeEventListener('resize', lazyload);
          window.removeEventListener('orientationChange', lazyload);
        });
      }
    }, 20);
  };
  document.addEventListener('scroll', lazyload);
  window.addEventListener('resize', lazyload);
  window.addEventListener('orientationChange', lazyload);
};

export default mapSec;
