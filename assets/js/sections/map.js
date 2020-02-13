import '../../less/2_plugins/YMap.less'
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

createMap('section-map');
