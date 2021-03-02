import {
  FETCH_CARS_SUCCESS,
  FETCH_CARS_REQUEST,
  FETCH_CARS_FAILURE, CHANGE_ACTIVE_CAR,
} from '../actions-types';

const initState = {
  cars: [],
  loading: true,
  error: false
}

const carsBlockReducer = (state, action) => {

  if (state === undefined) {
    return { ...initState }
  }

  switch (action.type) {
    case FETCH_CARS_REQUEST:
      return {
        ...initState
      };
    case FETCH_CARS_SUCCESS:
      return {
        cars: [...action.payload],
        loading: false,
        error: false
      };
    case FETCH_CARS_FAILURE:
      return {
        ...initState,
        loading: false,
        error: true
      }
    default:
      return state.userCars
  }
}

const changeActiveCarReducer = (state, action) => {

  if (state === undefined) {
    return undefined
  }

  switch (action.type) {
    case CHANGE_ACTIVE_CAR: {
      return action.payload
    }
    default:
      return state.activeCarId
  }
}

export {
  carsBlockReducer,
  changeActiveCarReducer
}
