import {
  FETCH_ACTIVE_CAR_WORKS_SUCCESS,
  FETCH_ACTIVE_CAR_WORKS_REQUEST,
  FETCH_ACTIVE_CAR_WORKS_FAILURE,
} from '../actions-types';

const activeCarWorksRequest = () => {
  return {
    type: FETCH_ACTIVE_CAR_WORKS_REQUEST
  }
}

const activeCarWorksLoaded = (works) => {
  return {
    type: FETCH_ACTIVE_CAR_WORKS_SUCCESS,
    payload: works
  }
}

const activeCarWorksError = (err) => {
  return {
    type: FETCH_ACTIVE_CAR_WORKS_FAILURE,
    payload: err
  }
}

const fetchActiveCarWorks = (garageData) => (carId) => (dispatch) => {
  dispatch(activeCarWorksRequest());
  garageData.getWorksByCarID(carId)
      .then(data => dispatch(activeCarWorksLoaded(data)))
      .catch(err => dispatch(activeCarWorksError(err)))
}

export {
  fetchActiveCarWorks
}
