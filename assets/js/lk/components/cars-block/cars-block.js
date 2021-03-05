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
    const {
      cars,
      loading,
      error,
      changeCar,
      activeCarId } = this.props

    return (
        <section className="garage__block garage__car">
            <h2 className="garage__title">Мои автомобили</h2>
            <Cars cars={cars} activeCarId={activeCarId} changeCar={changeCar} />
        </section>

    )
  }
}

const mapStateToProps = (props) => {
  const {userId, activeCarId, userCars: { cars, loading, error }} = props
  return {cars, loading, error, userId, activeCarId}
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
