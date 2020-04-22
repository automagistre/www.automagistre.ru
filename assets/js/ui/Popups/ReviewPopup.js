import Popup from './Popup';

class ReviewPopup extends Popup{

  constructor(review) {
    super();
    this._review = review
  }

  renderPopupBody() {
    const title = `${this._review.author} на <span style="text-transform: capitalize">${this._review.manufacture} ${this._review.model}</span>`,
          review = this._review.contentToHTML,
          source = `Источник: ${this._review.source ? this._review.source : '<img src="/img/icons/shrug_1f937.png" alt="хм">'}`,
          date = `${this._review.formattedDate}`;
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
