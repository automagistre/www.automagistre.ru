import ReadOnlyPropertyError from '../Errors/ReadOnlyPropertyError';
import ReviewPopup from './Popups/ReviewPopup';


class Review {

  /**
   *
   * @param {{author: string, created_at: string, model: string, id: number, source: string, publish_at: string, content: string, manufacturer: string}|{author: string, created_at: string, model: string, id: number, source: string, publish_at: string, content: string, manufacturer: string}|{author: string, created_at: string, model: string, id: number, source: string, publish_at: string, content: string, manufacturer: string}|{author: string, created_at: string, model: string, id: number, source: string, publish_at: string, content: string, manufacturer: string}|{author: string, created_at: string, model: string, id: number, source: string, publish_at: string, content: string, manufacturer: string}} review
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

  get contentToHTML() {
    return this._data.content.replace(/\\n/g, '<br>') || '';
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

  render(options={}) {
    const defaultOptions = {isOpen: false}
    Object.assign(defaultOptions, options);
    const {isOpen} = defaultOptions;
    const wrapper = document.createElement('div');
    const title = `${this.author} на <span style="text-transform: capitalize">${this.manufacture} ${this.model}</span>`,
          review = this.contentToHTML,
          source = `Источник: ${this.source ? this.source : '<img src="/img/icons/shrug_1f937.png" width="25" height="25" alt="хм">'}`,
          date = `${this.formattedDate}`,
          isLong = this.content.length > 380;
    wrapper.innerHTML =
        `<div class="review-card ${isOpen ? 'no-limit' : ''}">
            <h4 class="review-card__title">
                ${title}
            </h4>
            <div class="review-card__text ">
                ${review}
            </div>
            <div class="review-card__more">
                <a ${isLong && !isOpen ? 'style="visibility: visible"' : ''}">Читать полностью</a>
            </div>
            <div class="review-card__info">
                <span class="review-card__source">${source}</span>
                <b class="review-card__date">${date}</b>
            </div>
         </div>`;
    wrapper.firstElementChild
           .querySelector('.review-card__more')
           .addEventListener('click', ()=> {
              const popup = new ReviewPopup(this);
              popup.open();
           });
    this.node = wrapper.firstElementChild;
    return wrapper.firstElementChild;
  }
}

export default Review
