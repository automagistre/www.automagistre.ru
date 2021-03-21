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
  return {totalWorksCost, totalPartCost}
}

function ActiveCarRecommendationsBlock()  {

  const {data:{activeCarId:carId}} = useQuery(GET_ACTIVE_CAR_ID);
  const {data, loading, error} = useQuery(GET_RECOMMENDATIONS_BY_CAR_ID,{
    variables: { carId }
  })

  const {totalWorksCost, totalPartCost} = totalCosts(data?.recommendations)
  console.log(totalWorksCost, totalPartCost);

  return (
      <section className="garage__block garage__recommendations">
        <h2 className="garage__title">Рекомендации по автомобилю</h2>
        { error && <ErrorIndicator/> }
        { loading && <Loading/> }
        { data?.recommendations && <Recommendations recommendations={data.recommendations}/> }
        <div className="cg-total">
          <div className="cg-total__note">Всего рекомендаций:</div>
          <div className="cg-total__cost">{totalPartCost + totalWorksCost}<i
              className="icon-rub">a</i></div>
        </div>
      </section>)

}

export default ActiveCarRecommendationsBlock
