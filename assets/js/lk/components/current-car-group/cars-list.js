import React from 'react';
import {compose, WithData, withGarageData} from '../hoc';

const CarsList = ({ data }) => {
  let cars = [];
  console.log(data);
  if (data.length) {
    cars = data.map(car => {
      const gosnomerNumber = car.gosnomer.slice(0, 6)
      const gosnomerRegion = car.gosnomer.slice(6)

      return (
          <div className="car-info__head" key={ car.id }>
            <div className="car-info__plate">
              <span className="car-info__plate-num">{ gosnomerNumber }</span>
              <span className="car-info__plate-reg">{ gosnomerRegion }</span>
            </div>
            <nav className="car-info__btns">
              <a className="car-info__btn" role="button">Выбрать автомобиль</a>
            </nav>
          </div>
      )
    })
  }


  return (
      <div className="garage__car">
        <div className="car-info">
          <h3 className="car-info__title">Мои автомобили</h3>
          { cars }

        </div>
      </div>
  )
}

const mapMethodsToProps = (serverData) => {
  return {
    getData: () => serverData.getCarsByUserId('dummy_user_uuid') || [],
  }
};

export default compose(
    withGarageData(mapMethodsToProps),
    WithData,
)(CarsList);
