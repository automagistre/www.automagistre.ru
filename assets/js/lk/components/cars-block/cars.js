import React, {Fragment} from 'react';

const Cars = ({cars, changeCar, activeCarId}) => {
  const carsRender = cars.map(car => {
    const gosnomerNumber = car.gosnomer.slice(0, 6);
    const gosnomerRegion = car.gosnomer.slice(6);
    let classes = "garage__car__line";
    if (car.id === activeCarId) {
      classes += ' is-active';
    }
    return (
        <div className={classes} key={ car.id }>
          <div className="garage__car__info">
            {car.caseInfo.manufacturer} {car.caseInfo.name} ({car.caseInfo.caseName})
          </div>
          <div className="garage__car__sub-info">
            <span>VIN: {car.identifier}</span>
            <span>Комплектация: {car.engine.capacity} {car.engine.type} {car.year}г.</span>
          </div>
          <div className="garage__car__plate">
            <span className="garage__car__plate-num">{ gosnomerNumber }</span>
            <span className="garage__car__plate-reg">{ gosnomerRegion }</span>
          </div>
          <nav className="garage__car__btns">
            <a className="garage__car__btn" role="button"
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
