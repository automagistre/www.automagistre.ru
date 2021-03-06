import React, {Fragment} from 'react';

const Works = ({works}) => {
  return (
      <div className="garage__works__list">
        <div className="garage__works__table">
          <div>№ Заказа</div>
          <div>Дата</div>
          <div>Пробег</div>
          <div>Работа</div>
          <div>Цена</div>
          <div/>
          {
            works.map(work => {
              return (
                  <Fragment key={work.id}>
                    <div>{work.order.number}</div>
                    <div>{work.date}</div>
                    <div>{work.mileage}</div>
                    <div>{work.name}</div>
                    <div>{work.price.amount}</div>
                    <div className="garage__works__info">
                      <span>
                        <b>Работа: {work.name}<br/></b>
                        Заказ: {work.order.number}<br/>
                        Дата: {work.date}<br/>
                        Пробег: {work.mileage}<br/>
                        Стоимость: {work.price.amount}
                      </span>
                    </div>
                  </Fragment>
              )}
            )
          }
        </div>
      </div>
  )
}

export default Works
