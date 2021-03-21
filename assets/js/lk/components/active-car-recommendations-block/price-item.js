import React from 'react';

const PriceItem = ({ name, price, checked, children, onChange }) => {

  return (
      <li className="cg-price__item">
        <div className="cg-price__line">
          <label className="cg-price__check">
            <input type="checkbox" checked={ checked } onChange={()=>{
              onChange && onChange();
            }} />
            <span>{ name }</span>
          </label>
          <div className="cg-price__cost">
            { price }
            <i className="icon-rub">a</i>
          </div>
          <div className="cg-price__info empty"/>
        </div>
        { children &&
        <ul className="cg-price__list">
          { children }
        </ul>
        }
      </li>
  )
};

export default PriceItem;
