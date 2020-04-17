import Popup from './Popup';

class ReviewPopup extends Popup{

  constructor(title, review, footer) {
    super();
    this._title = title;
    this._review = review;
    this._footer = footer;
  }

  renderPopupBody() {
    return `<h4 class="popup__title">${this._title}</h4>
            <div class="popup-order">
              <div class="popup-order__lead">
                 ${this._review}
              </div>
              <div class="popup-order__remark">
                  ${this._footer}
              </div>
            </div>`;
  }
}

export default ReviewPopup;
