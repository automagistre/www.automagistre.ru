import { FETCH_CARS_SUCCESS,
  FETCH_CARS_REQUEST,
  FETCH_CARS_FAILURE } from '../actions-types';

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

const fetchCars = (garageData) => (userId) => (dispatch) => {
  dispatch(carsRequest());
  garageData.getCarsByUserId(userId)
  .then(data => dispatch(carsLoaded(data)))
  .catch(err => dispatch(carsError(err)))
}

export {
  fetchCars
}
