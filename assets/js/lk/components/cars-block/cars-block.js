import React from 'react';
import Cars from './cars';
import {useQuery} from '@apollo/client';
import {GET_USER_CARS} from '../../gql/queries';
import {ErrorIndicator, Loading} from '../server-indicators';

function CarsBlock() {

  const {data, loading, error} = useQuery(GET_USER_CARS)
  return (
      <section className="garage__block garage__car">
        <h2 className="garage__title">Мои автомобили</h2>
        { loading && <Loading/> }
        { error && <ErrorIndicator/> }
        { data?.cars && <Cars cars={data.cars}/>}
      </section>
  )
}

export default CarsBlock
