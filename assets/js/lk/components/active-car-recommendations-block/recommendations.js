import React, {Fragment} from 'react';

const Recommendations = ({recommendations}) => {
  return (
      <div className="car-info__group-body is-outlined">
        <ul className="car-info__list">
          {
            recommendations.map(recommendation => {
              return (
                  <Fragment>
                    <li className="car-info__data" key={recommendation.id}>
                      <span className="car-info__data-name">{recommendation.name}</span>
                      <span
                          className="car-info__data-val">{recommendation.price.amount}</span>
                    </li>
                    {
                      recommendation.parts.map(part => {
                        const {part: {id, name, price:{amount}}} = part
                        return(
                            <li className="car-info__data" key={id}>
                              <span className="car-info__data-name">{name}</span>
                              <span
                                  className="car-info__data-val">{amount}</span>
                            </li>
                        )
                      })
                    }
                  </Fragment>
              )})
          }
        </ul>
      </div>
  )
}

export default Recommendations
