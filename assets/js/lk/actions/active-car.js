import {
  FETCH_ACTIVE_CAR_WORKS_SUCCESS,
  FETCH_ACTIVE_CAR_WORKS_REQUEST,
  FETCH_ACTIVE_CAR_WORKS_FAILURE,

  FETCH_ACTIVE_CAR_RECOMMENDATIONS_REQUEST,
  FETCH_ACTIVE_CAR_RECOMMENDATIONS_SUCCESS,
  FETCH_ACTIVE_CAR_RECOMMENDATIONS_FAILURE,
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

const activeCarRecommendationsRequest = () => {
  return {
    type: FETCH_ACTIVE_CAR_RECOMMENDATIONS_REQUEST
  }
}

const activeCarRecommendationsLoaded = (recommendations) => {
  return {
    type: FETCH_ACTIVE_CAR_RECOMMENDATIONS_SUCCESS,
    payload: recommendations
  }
}

const activeCarRecommendationsError = (err) => {
  return {
    type: FETCH_ACTIVE_CAR_RECOMMENDATIONS_FAILURE,
    payload: err
  }
}

const fetchActiveCarRecommendations = (garageData) => (carId) => (dispatch) => {
  dispatch(activeCarRecommendationsRequest());
  garageData.getRecommendationsByCarID(carId)
  .then(data => dispatch(activeCarRecommendationsLoaded(data)))
  .catch(err => dispatch(activeCarRecommendationsError(err)))
}

export {
  fetchActiveCarWorks,
  fetchActiveCarRecommendations
}
