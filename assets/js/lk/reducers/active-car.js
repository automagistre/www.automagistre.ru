import {
  FETCH_ACTIVE_CAR_WORKS_SUCCESS,
  FETCH_ACTIVE_CAR_WORKS_REQUEST,
  FETCH_ACTIVE_CAR_WORKS_FAILURE,
  FETCH_ACTIVE_CAR_RECOMMENDATIONS_REQUEST,
  FETCH_ACTIVE_CAR_RECOMMENDATIONS_SUCCESS,
  FETCH_ACTIVE_CAR_RECOMMENDATIONS_FAILURE,
} from '../actions-types';

const initStateWorks = {
  loading: false,
  error: false,
  works: []
}

const worksActiveCarReducer = (state, action) => {
  if (state === undefined) {
    return {...initStateWorks}
  }

  switch (action.type) {
    case FETCH_ACTIVE_CAR_WORKS_REQUEST:
      return {
        ...initStateWorks,
        loading: true
      };
    case FETCH_ACTIVE_CAR_WORKS_SUCCESS:
      return {
        loading: false,
        error: false,
        works: action.payload
      }
    case FETCH_ACTIVE_CAR_WORKS_FAILURE:
      return {
        loading: false,
        error: true,
        works: []
      }
    default:
      return state.activeCarWorks
  }
}

const initStateRecommendations = {
  loading: false,
  error: false,
  recommendations: []
}

const recommendationsActiveCarReducer = (state, action) => {
  if (state === undefined) {
    return {...initStateRecommendations}
  }

  switch (action.type) {
    case FETCH_ACTIVE_CAR_RECOMMENDATIONS_REQUEST:
      return {
        ...initStateRecommendations,
        loading: true
      };
    case FETCH_ACTIVE_CAR_RECOMMENDATIONS_SUCCESS:
      return {
        loading: false,
        error: false,
        recommendations: action.payload
      }
    case FETCH_ACTIVE_CAR_RECOMMENDATIONS_FAILURE:
      return {
        loading: false,
        error: true,
        recommendations: []
      }
    default:
      return state.activeCarRecommendations
  }
}


export {
  worksActiveCarReducer,
  recommendationsActiveCarReducer
}
