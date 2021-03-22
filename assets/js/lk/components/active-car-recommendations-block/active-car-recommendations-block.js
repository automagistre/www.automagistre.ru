import React from 'react';
import Recommendations from './recommendations';
import {useQuery} from '@apollo/client';
import {
  GET_ACTIVE_CAR_ID,
  GET_RECOMMENDATIONS_BY_CAR_ID,
} from '../../gql/queries';
import {ErrorIndicator, Loading} from '../server-indicators';

const totalCosts = (works=[]) => {
  let totalWorksCost = 0;
  let totalPartCost = 0;
  totalWorksCost += works.filter(work => work.isChecked)
  .reduce((res, work) => {
    totalPartCost += work.parts.filter(partItem => partItem.isChecked)
               .reduce((res, partItem) =>{
                 return res + +partItem.part.price.amount;
    }, totalPartCost)
    return res + +work.price.amount
  }, totalWorksCost)
  return { totalWorksCost, totalPartCost, totalCost: totalWorksCost + totalPartCost }
}

function ActiveCarRecommendationsBlock()  {

  const {data:{activeCarId:carId}} = useQuery(GET_ACTIVE_CAR_ID);
  const {data, loading, error} = useQuery(GET_RECOMMENDATIONS_BY_CAR_ID,{
    variables: { carId }
  })

  const { totalWorksCost, totalPartCost } = totalCosts(data?.recommendations)
  const checkedLen = data?.recommendations.filter( work => work.isChecked).length

  return (
      <section className="garage__block garage__recommendations">
        <h2 className="garage__title">Рекомендации по автомобилю</h2>
        { error && <ErrorIndicator/> }
        { loading && <Loading/> }
        { data?.recommendations && <Recommendations recommendations={data.recommendations}/> }
        { checkedLen > 0 &&
            <div className="garage__recommendations-total">
              <div className="garage__recommendations-note">
                Всего рекомендаций выбрано:
              </div>
              <div className="garage__recommendations-cost">
                {totalPartCost + totalWorksCost}<i className="icon-rub">a</i>
              </div>
            </div>
        }
        { checkedLen > 0 &&
            <div className="garage__recommendations-total">
              <button className="btn garage__join-btn" onClick={ ()=> console.log("Заказ отправлен") }>
                 Заказать
              </button>
              <div className="garage__recommendations-btn-note">
                *Цены на работы действуют - 1г, на запчасти 1м.
              </div>
            </div>
        }
        { data?.recommendations.length === 0 &&
            <div className="garage__recommendations-note" style={{color:'#4E9C72'}}>
              Похоже, что ваш автомобиль полностью исправен
            </div>
        }
      </section>)

}

export default ActiveCarRecommendationsBlock
