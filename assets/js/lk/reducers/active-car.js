import {
  FETCH_ACTIVE_CAR_WORKS_SUCCESS,
  FETCH_ACTIVE_CAR_WORKS_REQUEST,
  FETCH_ACTIVE_CAR_WORKS_FAILURE,
} from '../actions-types';

const initState = {
  loading: true,
  error: false,
  works: []
}

const worksActiveCarReducer = (state, action) => {
  if (state === undefined) {
    return {...initState}
  }

  switch (action.type) {
    case FETCH_ACTIVE_CAR_WORKS_REQUEST:
      return {...initState};
    case FETCH_ACTIVE_CAR_WORKS_SUCCESS:
      return {
        loading: false,
        error: false,
        works: action.payload
      }
    case FETCH_ACTIVE_CAR_WORKS_FAILURE:
      return {
        loading: false,
        error: false,
        works: []
      }
    default:
      return state.activeCarWorks
  }
}

export {
  worksActiveCarReducer
}
