import React, {Fragment} from 'react';
import {useQuery} from '@apollo/client';
import {GET_ACTIVE_CAR_ID} from '../../gql/queries';
import {activeCarId} from '../../gql/cache';

const Cars = ({cars}) => {
  const { data } = useQuery(GET_ACTIVE_CAR_ID)
  if (!data.activeCarId && cars[0]) {
    activeCarId(cars[0].id)
  }
  const carsRender = cars.map(car => {
    const gosnomerNumber = car.gosnomer.slice(0, 6);
    const gosnomerRegion = car.gosnomer.slice(6);
    let classes = "garage__car__line";
    if (car.id === data.activeCarId) {
      classes += ' is-active';
    }
    return (
        <div className={classes} key={ car.id }>
          <div className="garage__car__info">
            {car.vehicle.manufacturer.name} {car.vehicle.name} {car.year}г.
          </div>
          <div className="garage__car__sub-info">
            <span>VIN: {car.identifier}</span>
            <span>Комплектация: {car.vehicle.caseName} {car.engine.capacity} </span>
          </div>
          <div className="garage__car__plate">
            <span className="garage__car__plate-num">{ gosnomerNumber }</span>
            <span className="garage__car__plate-reg">{ gosnomerRegion }</span>
          </div>
          <nav className="garage__car__btns">
            <a className="garage__car__btn" role="button"
               onClick={() => activeCarId(car.id)}>
              Выбрать автомобиль
            </a>
          </nav>
        </div>
    );
  })

  return (
      <Fragment>
        { carsRender }
      </Fragment>
  )
}

export default Cars
