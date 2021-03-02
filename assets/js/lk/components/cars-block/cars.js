import React, {Fragment} from 'react';

const Cars = ({cars, changeCar}) => {
  const carsRender = cars.map(car => {
    const gosnomerNumber = car.gosnomer.slice(0, 6)
    const gosnomerRegion = car.gosnomer.slice(6)
    return (
        <div className="car-info__head" key={ car.id }>
          <div className="car-info__plate">
            <span className="car-info__plate-num">{ gosnomerNumber }</span>
            <span className="car-info__plate-reg">{ gosnomerRegion }</span>
          </div>
          <nav className="car-info__btns">
            <a className="car-info__btn" role="button"
               onClick={() => changeCar(car.id)}>
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
