import Popup from './Popup';

class MapPopup extends Popup {
  renderPopupBody() {
    return `<h4 class="popup__title">Схема проезда</h4>
            <div class="popup-map">
              <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Afb09d454a75025a7752b7b018d929d773c9837847eb4dc76fd098c02aad12c77&amp;source=constructor"
                      width="100%"
                      height="100%"
                      frameborder="0"></iframe>
            </div>`;
  }
}

export default MapPopup;
