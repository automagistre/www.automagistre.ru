import React, {Component} from 'react';
import {compose, bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {withGarageData} from '../hoc'
import Cars from './cars';
import {fetchCars, changeCar} from '../../actions';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/client';
import {activeCarId} from '../../index';

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
      activeCarId,
      blockChangeCar
    } = this.props

    const tryChangeCar = (carId) => {
      if (!blockChangeCar) {
        changeCar(carId)
      }
    }
    return (
        <section className="garage__block garage__car">
            <h2 className="garage__title">Мои автомобили</h2>
            <Cars cars={cars} activeCarId={activeCarId} changeCar={tryChangeCar} />
        </section>

    )
  }
}

const mapStateToProps = (props) => {
  const {
    userId,
    activeCarId,
    userCars: { cars, loading, error },
    activeCarWorks: {loading: worksLoading},
    activeCarRecommendations: {loading: recommendationsLoading}

  } = props
  return {
    cars,
    loading,
    error,
    userId,
    activeCarId,
    blockChangeCar: worksLoading || recommendationsLoading
  }
}

const mapDispatchToProps = (dispatch, { garageData }) => {
  return bindActionCreators(
      {
        fetchCars: fetchCars(garageData),
        changeCar
      }, dispatch
  )
}



const GET_ACTIVE_CAR_ID = gql`
    query GetActiveCarId {
        activeCarId @client
    }
`;
function CarsBlock_v2() {
  const { data, loading, error } = useQuery(GET_ACTIVE_CAR_ID);
  console.log(data)
  return <div>
    <button type="button" onClick={()=>activeCarId("test")}>Id: {data.activeCarId}</button>
  </div>
}

// export default compose(
//     withGarageData(),
//     connect(mapStateToProps, mapDispatchToProps)
// )(CarsBlock);

export default CarsBlock_v2
