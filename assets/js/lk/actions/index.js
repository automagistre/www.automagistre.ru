const {USER_CARS_LOADED} = require('../actions-types');

const userCarsLoaded = (cars) => {
  return {
    type: USER_CARS_LOADED,
    payload: cars
  }
}

export {
  userCarsLoaded
}
