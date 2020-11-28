import {script} from "../lib";

async function createMap(sectionID) {
    const point = [55.717355, 37.721175],
          mapContainer = document.getElementById(sectionID),
          mapsOptions = [{
                  center: point,
                  zoom: 17.46,
                  controls: [],
              },{
                  mapAutoFocus: false,
                  yandexMapAutoSwitch: false,
                  yandexMapDisablePoiInteractivity: true,
                  fullscreenZIndex: 0,
              }],
          geoPointOptions = [
              {
                  geometry: {type: 'Point',coordinates: point,},
                  properties: {iconContent: 'АвтоМагистр',}
              },{
                  iconShadow: true, preset: 'islands#redAutoIcon', draggable: false,
              }];
    const ymaps = await script("https://api-maps.yandex.ru/2.1/?apikey=e09c2ddb-b834-4721-9b8c-8519b529e938&lang=ru_RU").
    then(() => global.ymaps);
    ymaps.ready(()=> {
        const map = new ymaps.Map(mapContainer, ...mapsOptions);
        let geoPoint = new ymaps.GeoObject(...geoPointOptions);
        map.behaviors.disable(['scrollZoom', 'rightMouseButtonMagnifier', 'drag', 'dblClickZoom', 'multiTouch']);
        map.geoObjects.add(geoPoint)
    });
}

const mapSec = () => {
  let lazyloadThrottleTimeout
  const mapSecNode = document.querySelector('section.sec-map')

  const lazyload = () => {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout)
    }
    lazyloadThrottleTimeout = setTimeout(() => {
      const scrollTop = window.pageYOffset
      if(mapSecNode.offsetTop < (window.innerHeight + scrollTop)) {
        require.ensure([], require => require('../../less/2_plugins/YMap.less'))
        createMap('section-map').then(() => {
          document.removeEventListener("scroll", lazyload)
          window.removeEventListener("resize", lazyload)
          window.removeEventListener("orientationChange", lazyload)
        })
      }}, 20)
  }
  document.addEventListener("scroll", lazyload)
  window.addEventListener("resize", lazyload)
  window.addEventListener("orientationChange", lazyload)
}

export default mapSec;


