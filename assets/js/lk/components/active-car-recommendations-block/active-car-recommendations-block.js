import React from 'react';
import Recommendations from './recommendations';
import {useQuery} from '@apollo/client';
import {
  GET_ACTIVE_CAR_ID,
  GET_RECOMMENDATIONS_BY_CAR_ID,
} from '../../gql/queries';
import {ErrorIndicator, Loading} from '../server-indicators';

function ActiveCarRecommendationsBlock()  {

  const {data:{activeCarId:carId}} = useQuery(GET_ACTIVE_CAR_ID);
  const {data, loading, error} = useQuery(GET_RECOMMENDATIONS_BY_CAR_ID,{
    variables: { carId }
  })
  console.log(data);

  return <section className="garage__block garage__recommendations">
    <h2 className="garage__title">Рекомендации по автомобилю</h2>
    { error && <ErrorIndicator/> }
    { loading && <Loading/> }
    { data?.recommendations && <Recommendations recommendations={data.recommendations}/> }
  </section>

}

export default ActiveCarRecommendationsBlock
