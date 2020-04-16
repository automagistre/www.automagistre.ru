import ReadOnlyPropertyError from '../Errors/ReadOnlyPropertyError';

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
    return this._data.author.toLowerCase() || 'Неизвестный'
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
    return this._data.source.toLowerCase() || '&#128540;'
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
    wrapper.innerHTML =
        `<div class="sec-reviews__slide">
            <div class="review-card">
                <h4 class="review-card__title">${this.author} на ${this.manufacture} ${this.model}</h4>
                <div class="review-card__text js-scroll-y">
                    ${this.content}
                </div>
                <div class="review-card__info">
                    <span class="review-card__link">${this.source}</span>
                    <b class="review-card__date">${this.formattedDate}</b>
                </div>
            </div>
         </div>`;
    return wrapper.firstElementChild;
  }
}

export default Review
