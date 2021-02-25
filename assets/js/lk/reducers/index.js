import {USER_CARS_LOADED} from '../actions-types';

const initialState = {
  userUuid: 'dummy_user_uuid',
  userCars: [],
  activeCar: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_CARS_LOADED:
      return {
        ...state,
        userCars: action.payload
      };
    default:
      return state
  }
}

export default reducer
