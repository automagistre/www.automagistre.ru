import Popup from './Popup';

class ReviewPopup extends Popup{

  constructor(data) {
    super();
    this._data = data
  }

  renderPopupBody() {
    const {title, review, source, date} = {...this._data};
    return `<h4 class="popup__title">${title}</h4>
            <div class="popup-review">
              <div class="popup-review__content">
                 ${review}
              </div>
              <div class="popup-review__info">
                    <span class="popup-review__source">${source}</span>
                    <b class="popup-review__date">${date}</b>
              </div>
            </div>`;
  }
}

export default ReviewPopup;
