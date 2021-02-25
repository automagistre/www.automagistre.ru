import {USER_LOADED} from '../actions-types';

const {USER_CARS_LOADED} = require('../actions-types');

const userCarsLoaded = (cars) => {
  return {
    type: USER_CARS_LOADED,
    payload: cars
  }
}

const userLoaded = (user) => {
  return {
    type: USER_LOADED,
    payload: user
  }
}

export {
  userLoaded,
  userCarsLoaded
}
