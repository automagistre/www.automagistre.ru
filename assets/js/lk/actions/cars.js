import {
  FETCH_CARS_SUCCESS,
  FETCH_CARS_REQUEST,
  FETCH_CARS_FAILURE, CHANGE_ACTIVE_CAR,
} from '../actions-types';

const carsRequest = () => {
  return {
    type: FETCH_CARS_REQUEST
  }
}

const carsLoaded = (cars) => {
  return {
    type: FETCH_CARS_SUCCESS,
    payload: cars
  }
}

const carsError = (err) => {
  return {
    type: FETCH_CARS_FAILURE,
    payload: err
  }
}

const changeCar = (carId) => {
  return {
    type: CHANGE_ACTIVE_CAR,
    payload: carId
  }
}

const fetchCars = (garageData) => (userId) => (dispatch) => {
  dispatch(carsRequest());
  garageData.getCarsByUserId(userId)
  .then(data => dispatch(carsLoaded(data)))
  .then(data => {
    if (data.payload.length) {
      dispatch(changeCar(data.payload[0].id))
    }
  })
  .catch(err => dispatch(carsError(err)))
}

export {
  fetchCars,
  changeCar
}