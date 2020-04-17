import ReadOnlyPropertyError from '../Errors/ReadOnlyPropertyError';
import ReviewPopup from './Popups/ReviewPopup';

class Review {

  /**
   *
   * @param {Object} review
   * @param {String} review.author
   * @param {String} review.manufacturer
   * @param {String} review.model
   * @param {String} review.content
   * @param {String} review.source
   * @param {Date} review.publish_at
   *
   */

  constructor(review) {
    this._data = {...review}
  }

  get author(){
    return this._data.author || 'Неизвестный'
  }

  set author(value) {
    throw new ReadOnlyPropertyError('author', value)
  }

  get manufacture() {
    return this._data.manufacturer.toLowerCase() || 'Автомобиле'
  }

  set manufacture(value) {
    throw new ReadOnlyPropertyError('manufacture', value)
  }

  get model() {
    return this._data.model.toLowerCase() || ''
  }

  set model(value) {
    throw new ReadOnlyPropertyError('model', value)
  }

  get content() {
    return this._data.content || '';
  }

  set content(value) {
    throw new ReadOnlyPropertyError('content', value)
  }

  get source() {
    return this._data.source.toLowerCase() || ''
  }

  set source(value) {
    throw new ReadOnlyPropertyError('source', value)
  }

  get date() {
    return new Date(this._data.publish_at)
  }

  set date(value) {
    throw new ReadOnlyPropertyError('date', value)
  }

  get formattedDate() {
    const d = this.date;
    return new Intl.DateTimeFormat('ru-RU').format(d)
  }

  render() {
    const wrapper = document.createElement('div');
    const title = `${this.author} на <span style="text-transform: capitalize">${this.manufacture} ${this.model}</span>`,
          review = this.content,
          footer = `Источник: <span class="review-card__source">${this.source ? this.source : '<img src="/img/icons/shrug_1f937.png" alt="хм" style="height: 20px; margin: 0 20px 0 10px">'}  ${this.formattedDate}</span>`,
          isLong = this.content.length > 380;
    wrapper.innerHTML =
        `<div class="sec-reviews__slide">
            <div class="review-card">
                <h4 class="review-card__title">
                    ${title}
                </h4>
                <div class="review-card__text js-review-scroll-y">
                    ${review}
                    
                </div>
                <div class="review-card__more">
                    <a ${isLong ? 'style="visibility: visible"' : ''}">Читать полностью</a>
                </div>
                <div class="review-card__info">
                    <span class="review-card__source">Источник: ${this.source ? this.source : '<img src="/img/icons/shrug_1f937.png" alt="хм">'}</span>
                    <b class="review-card__date">${this.formattedDate}</b>
                </div>
            </div>
         </div>`;
    wrapper.firstElementChild.querySelector('.review-card__more')
                             .addEventListener('click', ()=> {
                                const popup = new ReviewPopup(title, review, footer);
                                popup.open();
                              });
    this.node = wrapper.firstElementChild;
    return wrapper.firstElementChild;
  }
}

export default Review
