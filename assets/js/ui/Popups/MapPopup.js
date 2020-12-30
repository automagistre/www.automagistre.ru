import Popup from './Popup';
import {script} from '../../lib';

class MapPopup extends Popup {
  renderPopupBody() {
    return `<h4 class="popup__title">Схема проезда</h4>
            <div class="popup-map">
              <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A27ae86f43acc5c257f2c380fe9b7d4e2d637fa87f8bbdd5c0770696dee3b3532&amp;source=constructor" 
                      width="100%" 
                      height="100%" 
                      frameborder="0"></iframe>
            </div>`;
  }
}

export default MapPopup
