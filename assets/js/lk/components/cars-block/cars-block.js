import React, {Component} from 'react';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {withGarageData} from '../hoc'
import Cars from './cars';
import {fetchCars, changeCar} from '../../actions';

class CarsBlock extends Component {

  componentDidMount() {
    this.props.fetchCars(this.props.userId)
  }

  render() {
    const {cars, loading, error, changeCar} = this.props

    return (
        <div className="garage__car">
          <div className="car-info">
            <h3 className="car-info__title">Мои автомобили</h3>
            <Cars cars={cars} changeCar={changeCar} />
          </div>
        </div>

    )
  }
}

const mapStateToProps = (props) => {
  console.log(props);
  const {userId, userCars: { cars, loading, error }} = props
  return {cars, loading, error, userId}
}

const mapDispatchToProps = (dispatch, { garageData }) => {
  return bindActionCreators(
      {
        fetchCars: fetchCars(garageData),
        changeCar
      }, dispatch
  )
}

export default compose(
    withGarageData(),
    connect(mapStateToProps, mapDispatchToProps)
)(CarsBlock);
