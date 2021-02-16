import React from 'react';

const CurrentCarGroup = () => {
  return (
      <div className="garage__car">
        <div className="car-info">
          <h3 className="car-info__title">Информация по моей машине</h3>
          <div className="car-info__head">
            <div className="car-info__plate">
              <span className="car-info__plate-num">А000АА</span>
              <span className="car-info__plate-reg">96</span>
            </div>
            <nav className="car-info__btns">
              <a className="car-info__btn" role="button">Удалить автомобиль</a>
            </nav>
          </div>

          <div className="car-info__body">
            <div className="car-info__group">
              <div className="car-info__group-head">
                <h5 className="car-info__group-title">Калькуляция последних ремонтных работ:</h5>
              </div>
              <div className="car-info__group-body is-outlined">
                <ul className="car-info__list js-scroll-y">
                  <li className="car-info__data">
                    <span className="car-info__data-name">Двигатель</span><span
                      className="car-info__data-val">50 000 ₽</span>
                  </li>
                  <li className="car-info__data">
                    <span className="car-info__data-name">Стартер</span><span
                      className="car-info__data-val">3 000 ₽</span>
                  </li>
                  <li className="car-info__data">
                    <span className="car-info__data-name">Подвеска</span><span
                      className="car-info__data-val">15 000 ₽</span>
                  </li>
                  <li className="car-info__data">
                    <span
                        className="car-info__data-name">ТО после 140 000 км</span><span
                      className="car-info__data-val">6000 ₽</span>
                  </li>
                  <li className="car-info__data">
                    <span
                        className="car-info__data-name">Замена колодок</span><span
                      className="car-info__data-val">4 000 ₽</span>
                  </li>
                  <li className="car-info__data">
                    <span className="car-info__data-name">Двигатель</span><span
                      className="car-info__data-val">50 000 ₽</span>
                  </li>
                  <li className="car-info__data">
                    <span className="car-info__data-name">Стартер</span><span
                      className="car-info__data-val">3 000 ₽</span>
                  </li>
                  <li className="car-info__data">
                    <span className="car-info__data-name">Подвеска</span><span
                      className="car-info__data-val">15 000 ₽</span>
                  </li>
                  <li className="car-info__data">
                    <span
                        className="car-info__data-name">ТО после 140 000 км</span><span
                      className="car-info__data-val">6000 ₽</span>
                  </li>
                  <li className="car-info__data">
                    <span
                        className="car-info__data-name">Замена колодок</span><span
                      className="car-info__data-val">4 000 ₽</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="car-info__group">
              <div className="car-info__group-head">
                <h5 className="car-info__group-title">История ремонта и обслуживания:</h5>
              </div>
              <div className="car-info__group-body is-outlined">
                <ul className="car-info__list js-scroll-y">
                  <li className="car-info__data">
                    <span
                        className="car-info__data-name">ТО 140 000 км</span><span
                      className="car-info__data-val">23.05.2017</span>
                  </li>
                  <li className="car-info__data">
                    <span
                        className="car-info__data-name">ТО 200 000 км</span><span
                      className="car-info__data-val">11.07.2017</span>
                  </li>
                  <li className="car-info__data">
                    <span
                        className="car-info__data-name">ТО 300 000 км</span><span
                      className="car-info__data-val">30.01.2017</span>
                  </li>
                  <li className="car-info__data">
                    <span
                        className="car-info__data-name">Замена колодок</span><span
                      className="car-info__data-val">7.08.2017</span>
                  </li>
                  <li className="car-info__data">
                    <span className="car-info__data-name">Очистка салона от крови</span><span
                      className="car-info__data-val">10.01.1999</span>
                  </li>
                  <li className="car-info__data">
                    <span className="car-info__data-name">Устранение временных червоточин и удаление</span><span
                      className="car-info__data-val">10.01.1999</span>
                  </li>
                  <li className="car-info__data">
                    <span
                        className="car-info__data-name">ТО 140 000 км</span><span
                      className="car-info__data-val">23.05.2017</span>
                  </li>
                  <li className="car-info__data">
                    <span
                        className="car-info__data-name">ТО 200 000 км</span><span
                      className="car-info__data-val">11.07.2017</span>
                  </li>
                  <li className="car-info__data">
                    <span
                        className="car-info__data-name">ТО 300 000 км</span><span
                      className="car-info__data-val">30.01.2017</span>
                  </li>
                  <li className="car-info__data">
                    <span
                        className="car-info__data-name">Замена колодок</span><span
                      className="car-info__data-val">7.08.2017</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default CurrentCarGroup;
