import React from 'react'

const Works = ({works}) => {
  return (
      <div className="car-info__group-body is-outlined">
        <ul className="car-info__list">
          {
            works.map(work => {
              return (
                  <li className="car-info__data" key={work.id}>
                    <span className="car-info__data-name">{work.name}</span>
                    <span
                        className="car-info__data-val">{work.price.amount}</span>
                  </li>
              )})
          }
        </ul>
      </div>
  )
}

export default Works
