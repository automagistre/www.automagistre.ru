import React from 'react';
import cache, {isCheckedPartItem, isCheckedRec} from '../../gql/cache';
import {apolloClient} from '../../index';
import PriceItem from './price-item';

const Recommendations = ({recommendations}) => {

  const onToggleWork = (work) => {
    const isChecked = !work.isChecked
    apolloClient.writeFragment({
      id: cache.identify(work),
      fragment: isCheckedRec,
      data: { isChecked }
    })
    work.parts.forEach(part => {
      apolloClient.writeFragment({
        id: cache.identify(part),
        fragment: isCheckedPartItem,
        data: { isChecked }
      })
    })
  }

  const onTogglePart = (part) => {
    const isChecked = !part.isChecked
    apolloClient.writeFragment({
      id: cache.identify(part),
      fragment: isCheckedPartItem,
      data: { isChecked }
    })
  }

  const parts = (work) => {
    const toggle = (part) => {
      if(!work.isChecked && !part.isChecked) {
        onToggleWork(work);
      } else {
        onTogglePart(part)
      }
    }
    return work.parts.map(part =>
        <PriceItem key={part.id}
                   name={part.part.name}
                   price={part.part.price.amount}
                   checked={part.isChecked}
                   onChange={() => { toggle(part) }}/>);
  }

  return (
      <div className="cg-price__body">
        <ul className="cg-price__list">
          {
            recommendations.map(work =>
                  <PriceItem key={work.id}
                             name={work.name}
                             price={work.price.amount}
                             checked={work.isChecked}
                             onChange={()=>onToggleWork(work)}>

                    { parts(work) }

                  </PriceItem>)
          }
        </ul>
      </div>
  )
}

export default Recommendations
